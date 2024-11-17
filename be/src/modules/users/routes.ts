import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { signupSchema } from "./validation.schema";
import { signIn, signUp } from "./controller";
import validationMiddleware from "../middlewares/validation.middleware";

const router = Router();

router.post("/signup", validationMiddleware(signupSchema, "body"), signUp);

router.post("/signin", signIn);

router.get("/user", authMiddleware, (req, res) => {
  console.log("user route");
});

export const userRouter = router;
