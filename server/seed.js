import "dotenv/config";
import { eq } from "drizzle-orm";
import { auth } from "./auth.js";
import { db } from "./db.js";
import { partnerTiers, teams, user } from "./schema.js";

const teamSeed = [
  { name: "Team Yaksha", discipline: "International Aero Design", description: "Team Yaksha represents AeroBMSCE in international SAE competitions." },
  { name: "Team Blue Impulse", discipline: "Aeromodelling", description: "Team Blue Impulse works on aeromodelling at AeroBMSCE." },
  { name: "Team Flying Phantoms", discipline: "Drone development", description: "Team Flying Phantoms works on autonomous drones at AeroBMSCE." },
  { name: "Team Vectors", discipline: "Drone racing", description: "Team Vectors competes in drone racing for AeroBMSCE." },
];

const tierSeed = [
  { name: "Platinum partner", descriptor: "Title partner · strategic alignment", benefits: ["Primary logo on AeroBMSCE aircraft and UAV models", "Logo placement and verbal acknowledgement in AeroBMSCE videos and events", "Priority placement on AeroBMSCE flags, banners and standees", "Feature in AeroBMSCE reports, submissions and press releases", "Direct engagement with AeroBMSCE's core team and leads", "Association with AeroBMSCE flagship projects and events"] },
  { name: "Gold partner", descriptor: "High visibility · competition presence", benefits: ["Secondary logo on selected AeroBMSCE aircraft models", "Logo on AeroBMSCE team uniforms and presentations", "Shared branding on AeroBMSCE competition banners and standees", "Recognition across AeroBMSCE events and social media", "Branding during AeroBMSCE workshops and technical events", "Presence at AeroBMSCE national and international competitions"] },
  { name: "Silver partner", descriptor: "Event and media visibility", benefits: ["Logo on AeroBMSCE team uniforms", "Logo on AeroBMSCE presentations and project materials", "Inclusion on AeroBMSCE team banners and shared standees", "Recognition in AeroBMSCE event communications", "Social media mentions during AeroBMSCE competitions", "Visibility at selected AeroBMSCE events"] },
  { name: "Technical and ecosystem partner", descriptor: "Design · simulation · analysis", benefits: ["Show tools in AeroBMSCE design and competition reports", "Credit tools in AeroBMSCE technical presentations and submissions", "Co-branded hands-on workshops with AeroBMSCE", "Logo on AeroBMSCE reports, posters and certificates", "Technical banners and standees at AeroBMSCE workshops", "Early access to AeroBMSCE students"] },
];

for (const team of teamSeed) db.insert(teams).values(team).onConflictDoNothing().run();
for (const tier of tierSeed) db.insert(partnerTiers).values({ ...tier, benefits: JSON.stringify(tier.benefits) }).onConflictDoNothing().run();

const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
const adminPassword = process.env.ADMIN_PASSWORD;
if (!adminEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(adminEmail)) throw new Error("Set a valid ADMIN_EMAIL in .env before seeding");
if (!adminPassword || adminPassword.length < 12 || adminPassword.length > 128) throw new Error("Set ADMIN_PASSWORD (12–128 characters) in .env before seeding");

let adminUser = db.select().from(user).where(eq(user.email, adminEmail)).get();
if (!adminUser) {
  await auth.api.signUpEmail({ body: { name: "AeroBMSCE Admin", email: adminEmail, password: adminPassword } });
  adminUser = db.select().from(user).where(eq(user.email, adminEmail)).get();
}
if (!adminUser) throw new Error("Admin account could not be created");
db.update(user).set({ role: "admin", updatedAt: new Date() }).where(eq(user.id, adminUser.id)).run();
console.log(`Seeded ${teamSeed.length} teams and ${tierSeed.length} partner tiers. Admin account ready for ${adminEmail}.`);
