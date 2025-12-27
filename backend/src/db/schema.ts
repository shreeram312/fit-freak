import { boolean, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  clerk_user_id: text("clerk_user_id").notNull().unique(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  image_url: text("image_url"),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
});
