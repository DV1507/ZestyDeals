import { Request, Response } from "express";
import { prismaClient } from "../../db";
import generalResponse from "../../utlis/generalResponse";
import jwt from "jsonwebtoken";

export const createProducts = async (req: Request, res: Response) => {
  // @ts-ignore
  const user = req.user;
  const { name, description, price, stock, image, categoryId = 2 } = req.body;

  const product = await prismaClient?.product?.create({
    data: {
      name,
      description,
      price,
      stock,
      image: "",
      categoryId,
      sellerId: user?.id,
    },
  });
  if (!product) {
    return generalResponse(
      res,
      400,
      { success: false },
      "Product Could not be created. Try again",
      true
    );
  }

  return generalResponse(
    res,
    200,
    { success: true, product },
    "Product added successfully",
    true
  );
};
