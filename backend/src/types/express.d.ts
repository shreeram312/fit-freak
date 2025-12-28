import type { InferSelectModel } from "drizzle-orm";
import type { users } from "../db/schema";

declare global {
  namespace Express {
    interface Request {
      auth?: {
        userId: string;
        sessionId?: string;
      };
      user?: InferSelectModel<typeof users>;
    }
  }
}
