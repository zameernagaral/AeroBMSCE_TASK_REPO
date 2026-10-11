import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { and, desc, eq } from "drizzle-orm";
import { toNodeHandler, fromNodeHeaders } from "better-auth/node";
import { auth } from "./auth.js";
import { db } from "./db.js";
import { inquiries, partnerTiers, results, teams } from "./schema.js";
import { idSchema, inquirySchema, inquiryStatusSchema, pageQuerySchema, resultSchema, resultsQuerySchema, teamSchema } from "./validation.js";

const requiredEnv = ["FRONTEND_URL", "BETTER_AUTH_URL", "BETTER_AUTH_SECRET"];
for (const key of requiredEnv) {
  if (!process.env[key]) throw new Error(`${key} must be set in .env`);
}
if (process.env.BETTER_AUTH_SECRET.length < 32) throw new Error("BETTER_AUTH_SECRET must be at least 32 characters");
const frontendOrigin = new URL(process.env.FRONTEND_URL).origin;
const port = Number(process.env.PORT || 3000);
if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error("PORT must be a valid TCP port");

const app = express();
app.disable("x-powered-by");
app.use(helmet());
app.use(cors({
  origin: frontendOrigin,
  credentials: true,
  methods: ["GET", "POST", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

const authLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 20, standardHeaders: "draft-8", legacyHeaders: false });
const writeLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 10, standardHeaders: "draft-8", legacyHeaders: false });
app.use("/api/auth", authLimiter);
// Better Auth consumes its own request body; mount before express.json().
app.all("/api/auth/*splat", toNodeHandler(auth));
app.use(express.json({ limit: "32kb", strict: true }));

function parse(schema, value, res) {
  const parsed = schema.safeParse(value);
  if (!parsed.success) {
    res.status(400).json({ error: "Validation failed", details: parsed.error.issues.map(({ path, message }) => ({ path: path.join("."), message })) });
    return null;
  }
  return parsed.data;
}

async function requireUser(req, res, next) {
  try {
    const session = await auth.api.getSession({ headers: fromNodeHeaders(req.headers) });
    if (!session?.user) return res.status(401).json({ error: "Authentication required" });
    req.authSession = session;
    next();
  } catch (error) {
    next(error);
  }
}

function requireAdmin(req, res, next) {
  if (req.authSession?.user?.role !== "admin") return res.status(403).json({ error: "Admin permission required" });
  next();
}

app.get("/api/health", (_req, res) => res.json({ status: "ok" }));
app.get("/api/me", requireUser, (req, res) => {
  const { id, name, email, role } = req.authSession.user;
  res.json({ user: { id, name, email, role } });
});

app.get("/api/teams", (req, res) => {
  const query = parse(pageQuerySchema, req.query, res);
  if (!query) return;
  res.json({ data: db.select().from(teams).orderBy(teams.name).limit(query.limit).all() });
});
app.get("/api/results", (req, res) => {
  const query = parse(resultsQuerySchema, req.query, res);
  if (!query) return;
  const condition = query.year ? eq(results.year, query.year) : undefined;
  const data = db.select().from(results).where(condition).orderBy(desc(results.year)).limit(query.limit).all();
  res.json({ data });
});
app.get("/api/partner-tiers", (req, res) => {
  const query = parse(pageQuerySchema, req.query, res);
  if (!query) return;
  const data = db.select().from(partnerTiers).orderBy(partnerTiers.id).limit(query.limit).all();
  res.json({ data: data.map((tier) => ({ ...tier, benefits: JSON.parse(tier.benefits) })) });
});

app.post("/api/inquiries", writeLimiter, (req, res, next) => {
  const body = parse(inquirySchema, req.body, res);
  if (!body) return;
  try {
    const [created] = db.insert(inquiries).values({ ...body, createdAt: new Date() }).returning({ id: inquiries.id, status: inquiries.status, createdAt: inquiries.createdAt }).all();
    res.status(201).json({ inquiry: created });
  } catch (error) { next(error); }
});

app.post("/api/admin/teams", writeLimiter, requireUser, requireAdmin, (req, res, next) => {
  const body = parse(teamSchema, req.body, res);
  if (!body) return;
  try { const [created] = db.insert(teams).values(body).returning().all(); res.status(201).json({ team: created }); }
  catch (error) { next(error); }
});
app.post("/api/admin/results", writeLimiter, requireUser, requireAdmin, (req, res, next) => {
  const body = parse(resultSchema, req.body, res);
  if (!body) return;
  try { const [created] = db.insert(results).values(body).returning().all(); res.status(201).json({ result: created }); }
  catch (error) { next(error); }
});
app.get("/api/admin/inquiries", requireUser, requireAdmin, (req, res) => {
  const query = parse(pageQuerySchema, req.query, res);
  if (!query) return;
  res.json({ data: db.select().from(inquiries).orderBy(desc(inquiries.createdAt)).limit(query.limit).all() });
});
app.patch("/api/admin/inquiries/:id", writeLimiter, requireUser, requireAdmin, (req, res, next) => {
  const id = parse(idSchema, req.params.id, res);
  const body = parse(inquiryStatusSchema, req.body, res);
  if (id === null || !body) return;
  try {
    const [updated] = db.update(inquiries).set({ status: body.status }).where(eq(inquiries.id, id)).returning().all();
    if (!updated) return res.status(404).json({ error: "Inquiry not found" });
    res.json({ inquiry: updated });
  } catch (error) { next(error); }
});

app.use((_req, res) => res.status(404).json({ error: "Route not found" }));
app.use((error, _req, res, _next) => {
  if (error?.status === 429) return res.status(429).json({ error: "Too many requests" });
  if (error?.code === "SQLITE_CONSTRAINT_UNIQUE") return res.status(409).json({ error: "A record with those details already exists" });
  if (error instanceof SyntaxError && "body" in error) return res.status(400).json({ error: "Request body must be valid JSON" });
  console.error("Request failed:", error);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(port, () => console.log(`AeroBMSCE API listening on ${port}; CORS origin ${frontendOrigin}`));
