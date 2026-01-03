import { signUp } from "@/controllers/signup";
import { Router } from "express";

const authRouter: Router = Router();

authRouter.post("/sign-up", signUp);

export default authRouter;
