import { Router } from "express";
import validationMiddleware from "../middlewares/validation.middleware";
import { createProductSchema } from "./validation.schema";
import { createProducts } from "./controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();
const basePath = "/products";
router.post(
  `${basePath}/create`,
  validationMiddleware(createProductSchema, "body"),
  authMiddleware,
  createProducts
);

export const productRouter = router;
