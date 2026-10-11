import "dotenv/config";
import fs from "node:fs";
import path from "node:path";
import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import * as schema from "./schema.js";

const dbPath = path.resolve(process.env.DATABASE_PATH || "./data/aerobmsce.sqlite");
fs.mkdirSync(path.dirname(dbPath), { recursive: true });

export const sqlite = new Database(dbPath);
sqlite.pragma("foreign_keys = ON");
sqlite.pragma("journal_mode = WAL");
sqlite.exec(`
  CREATE TABLE IF NOT EXISTS user (
    id text PRIMARY KEY NOT NULL, name text NOT NULL, email text NOT NULL UNIQUE,
    emailVerified integer NOT NULL DEFAULT 0, image text, role text NOT NULL DEFAULT 'member',
    createdAt integer NOT NULL, updatedAt integer NOT NULL
  );
  CREATE TABLE IF NOT EXISTS session (
    id text PRIMARY KEY NOT NULL, expiresAt integer NOT NULL, token text NOT NULL UNIQUE,
    createdAt integer NOT NULL, updatedAt integer NOT NULL, ipAddress text, userAgent text,
    userId text NOT NULL REFERENCES user(id) ON DELETE CASCADE
  );
  CREATE TABLE IF NOT EXISTS account (
    id text PRIMARY KEY NOT NULL, accountId text NOT NULL, providerId text NOT NULL,
    userId text NOT NULL REFERENCES user(id) ON DELETE CASCADE, accessToken text, refreshToken text,
    idToken text, accessTokenExpiresAt integer, refreshTokenExpiresAt integer, scope text,
    password text, createdAt integer NOT NULL, updatedAt integer NOT NULL
  );
  CREATE TABLE IF NOT EXISTS verification (
    id text PRIMARY KEY NOT NULL, identifier text NOT NULL, value text NOT NULL,
    expiresAt integer NOT NULL, createdAt integer NOT NULL, updatedAt integer NOT NULL
  );
  CREATE TABLE IF NOT EXISTS teams (
    id integer PRIMARY KEY AUTOINCREMENT, name text NOT NULL UNIQUE,
    discipline text NOT NULL, description text NOT NULL
  );
  CREATE TABLE IF NOT EXISTS results (
    id integer PRIMARY KEY AUTOINCREMENT, title text NOT NULL, event text NOT NULL,
    year integer NOT NULL, placement text, verified integer NOT NULL DEFAULT 0
  );
  CREATE TABLE IF NOT EXISTS partner_tiers (
    id integer PRIMARY KEY AUTOINCREMENT, name text NOT NULL UNIQUE,
    descriptor text NOT NULL, benefits text NOT NULL
  );
  CREATE TABLE IF NOT EXISTS inquiries (
    id integer PRIMARY KEY AUTOINCREMENT, name text NOT NULL, email text NOT NULL,
    organization text NOT NULL, message text NOT NULL, status text NOT NULL DEFAULT 'new',
    created_at integer NOT NULL
  );
`);

export const db = drizzle(sqlite, { schema });
