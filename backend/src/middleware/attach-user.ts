import { db } from "@/db";
import { users } from "@/db/schema";
import type { Request, Response } from "express";
import type { NextFunction } from "express";
import { eq } from "drizzle-orm";

export async function attachUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const clerkId = req.auth?.userId;

  if (!clerkId) return res.status(401).json({ error: "Unauthorized" });

  const user = await db.query.users.findFirst({
    where: eq(users.clerk_user_id, clerkId),
  });

  if (!user) return res.status(404).json({ error: "User not found" });

  req.user = user;
  next();
}
