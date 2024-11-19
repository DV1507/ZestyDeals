import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { loginSchema, signupSchema } from "./validation.schema";
import { signIn, signUp, user } from "./controller";
import validationMiddleware from "../middlewares/validation.middleware";

const router = Router();

router.post("/signup", validationMiddleware(signupSchema, "body"), signUp);

router.post("/signin", validationMiddleware(loginSchema, "body"), signIn);

router.get("/user", authMiddleware, user);

export const userRouter = router;
