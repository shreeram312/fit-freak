import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { type Request, type Response } from "express";

export const signUp = async (req: Request, res: Response) => {
  const { email, clerkId, name } = req.body as {
    email: string;
    clerkId: string;
    name: string;
  };
  console.log("signUp", email, clerkId, name);

  const user = await db.query.users.findFirst({
    where: eq(users.clerk_user_id, clerkId),
  });

  if (user) {
    return res.status(400).json({ error: "User already exists" }) as Response;
  }

  const newUser = await db
    .insert(users)
    .values({
      clerk_user_id: clerkId,
      email: email,
      name: name,
      image_url: "",
    })
    .returning();

  return res.status(201).json({ user: newUser }) as Response;
};
