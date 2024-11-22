import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { loginSchema, signupSchema } from "./validation.schema";
import { signIn, signUp, user } from "./controller";
import validationMiddleware from "../middlewares/validation.middleware";

const router = Router();
const basePath = "/user";
router.post(
  `${basePath}/signup`,
  validationMiddleware(signupSchema, "body"),
  signUp
);

router.post(
  `${basePath}/signin`,
  validationMiddleware(loginSchema, "body"),
  signIn
);

router.get(`${basePath}/me`, authMiddleware, user);

export const userRouter = router;
