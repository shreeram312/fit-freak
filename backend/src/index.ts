import { ENV } from "@/lib/env";
import express from "express";
import type { Request, Response } from "express";
import {
  ClerkExpressRequireAuth,
  ClerkExpressWithAuth,
} from "@clerk/clerk-sdk-node";
import { attachUser } from "./middleware/attach-user";

const app = express();

app.get(
  "/protected-auth-required",
  ClerkExpressRequireAuth(),
  attachUser,
  (req, res) => {
    res.json(req.user);
  }
);

app.listen(ENV.PORT, () => {
  console.log(`Server is running on port ${ENV.PORT}`);
});
