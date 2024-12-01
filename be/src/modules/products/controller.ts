import { Request, Response } from "express";
import { prismaClient } from "../../db";
import generalResponse from "../../utlis/generalResponse";

export const createProducts = async (req: Request, res: Response) => {
  // @ts-ignore
  const user = req.user;
  const { name, description, price, stock, image, categoryId = 1 } = req.body;

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

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const user = req.user;
    const products = await prismaClient?.product?.findMany({
      where: {
        sellerId: user?.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!products.length) {
      return generalResponse(
        res,
        404,
        { success: false },
        "No products found",
        true
      );
    }
    return generalResponse(
      res,
      200,
      { success: true, products: products || [] },
      "Product fetched successfully",
      true
    );
  } catch (error) {
    return generalResponse(res, 400, {}, "Product Could not be fetched", true);
  }
};
