import { Router } from "express";
import validationMiddleware from "../middlewares/validation.middleware";
import { createProductSchema, deleteProductSchema } from "./validation.schema";
import {
  createProducts,
  DeleteProducts,
  EditProducts,
  getAllProducts,
} from "./controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();
const basePath = "/products";
router.post(
  `${basePath}/create`,
  validationMiddleware(createProductSchema, "body"),
  authMiddleware,
  createProducts
);

router.post(
  `${basePath}/edit`,
  validationMiddleware(createProductSchema, "body"),
  authMiddleware,
  EditProducts
);

router.post(
  `${basePath}/delete`,
  validationMiddleware(deleteProductSchema, "body"),
  authMiddleware,
  DeleteProducts
);
router.post(`${basePath}/get-all`, authMiddleware, getAllProducts);

export const productRouter = router;
