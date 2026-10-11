import { z } from "zod";

export const idSchema = z.coerce.number().int().positive();
export const pageQuerySchema = z.object({
  limit: z.coerce.number().int().min(1).max(100).default(50),
}).strict();
export const teamSchema = z.object({
  name: z.string().trim().min(2).max(80),
  discipline: z.string().trim().min(2).max(80),
  description: z.string().trim().min(10).max(500),
}).strict();
export const resultSchema = z.object({
  title: z.string().trim().min(3).max(120),
  event: z.string().trim().min(2).max(100),
  year: z.number().int().min(2000).max(new Date().getFullYear() + 2),
  placement: z.string().trim().min(2).max(100).nullable().optional(),
  verified: z.boolean().default(false),
}).strict();
export const inquirySchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(254),
  organization: z.string().trim().min(2).max(120),
  message: z.string().trim().min(20).max(2000),
}).strict();
export const inquiryStatusSchema = z.object({ status: z.enum(["new", "reviewing", "closed"]) }).strict();
