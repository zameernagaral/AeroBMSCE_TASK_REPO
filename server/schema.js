import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

const created = () => integer("createdAt", { mode: "timestamp" }).notNull();
const updated = () => integer("updatedAt", { mode: "timestamp" }).notNull();

export const user = sqliteTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: integer("emailVerified", { mode: "boolean" }).notNull().default(false),
  image: text("image"),
  role: text("role").notNull().default("member"),
  createdAt: created(),
  updatedAt: updated(),
});

export const session = sqliteTable("session", {
  id: text("id").primaryKey(),
  expiresAt: integer("expiresAt", { mode: "timestamp" }).notNull(),
  token: text("token").notNull().unique(),
  createdAt: created(),
  updatedAt: updated(),
  ipAddress: text("ipAddress"),
  userAgent: text("userAgent"),
  userId: text("userId").notNull().references(() => user.id, { onDelete: "cascade" }),
});

export const account = sqliteTable("account", {
  id: text("id").primaryKey(),
  accountId: text("accountId").notNull(),
  providerId: text("providerId").notNull(),
  userId: text("userId").notNull().references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("accessToken"),
  refreshToken: text("refreshToken"),
  idToken: text("idToken"),
  accessTokenExpiresAt: integer("accessTokenExpiresAt", { mode: "timestamp" }),
  refreshTokenExpiresAt: integer("refreshTokenExpiresAt", { mode: "timestamp" }),
  scope: text("scope"),
  password: text("password"),
  createdAt: created(),
  updatedAt: updated(),
});

export const verification = sqliteTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: integer("expiresAt", { mode: "timestamp" }).notNull(),
  createdAt: created(),
  updatedAt: updated(),
});

export const teams = sqliteTable("teams", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull().unique(),
  discipline: text("discipline").notNull(),
  description: text("description").notNull(),
});

export const results = sqliteTable("results", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  event: text("event").notNull(),
  year: integer("year").notNull(),
  placement: text("placement"),
  verified: integer("verified", { mode: "boolean" }).notNull().default(false),
});

export const partnerTiers = sqliteTable("partner_tiers", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull().unique(),
  descriptor: text("descriptor").notNull(),
  benefits: text("benefits").notNull(),
});

export const inquiries = sqliteTable("inquiries", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull(),
  organization: text("organization").notNull(),
  message: text("message").notNull(),
  status: text("status").notNull().default("new"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
});
