import "dotenv/config";
import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

const envSchema = z.object({
  PORT: z
    .string()
    .refine(
      (port: string) => parseInt(port) > 0 && parseInt(port) < 65536,
      "Invalid port number"
    ),
  DATABASE_URL: z.string("Invalid database URL").optional(),
  API_URL: z.string("Invalid API URL").optional(),
  CLERK_SECRET_KEY: z.string("Invalid Clerk secret key").optional(),
  CLERK_PUBLISHABLE_KEY: z.string("Invalid Clerk publishable key").optional(),
});

type Env = z.infer<typeof envSchema>;

export const ENV: Env = envSchema.parse(process.env);
