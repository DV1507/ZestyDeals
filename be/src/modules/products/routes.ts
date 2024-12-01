import { Router } from "express";
import validationMiddleware from "../middlewares/validation.middleware";
import { createProductSchema } from "./validation.schema";
import { createProducts, getAllProducts } from "./controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();
const basePath = "/products";
router.post(
  `${basePath}/create`,
  validationMiddleware(createProductSchema, "body"),
  authMiddleware,
  createProducts
);
router.post(`${basePath}/get-all`, authMiddleware, getAllProducts);

export const productRouter = router;
