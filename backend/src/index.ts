import { ENV } from "@/lib/env";
import express from "express";
import authRouter from "./routes/auth.router";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import type { Request, Response } from "express";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());
app.get("/api/health", (req, res) => {
  res.json({
    message: "Server is running",
    status: "ok",
    timestamp: new Date().toISOString(),
  });
});

app.use("/api/auth", authRouter);

app.get(
  "/api/protected",
  ClerkExpressRequireAuth(),
  (req: Request, res: Response) => {
    res.json({
      message: "Protected route",
      status: "ok",
      timestamp: new Date().toISOString(),
    });
  }
);

app.listen(ENV.PORT, () => {
  console.log(`Server is running on port ${ENV.PORT} `);
});
