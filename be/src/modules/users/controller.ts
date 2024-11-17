import { Request, Response } from "express";
import { prismaClient } from "../../db";
import generalResponse from "../../utlis/generalResponse";
import { JWT_SECRET } from "../../config";
import jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
export const signIn = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const user = await prismaClient?.user?.findFirst({
    where: {
      email: username,
    },
  });
  if (!user) {
    return generalResponse(
      res,
      403,
      {},
      "Sorry username or password invalid",
      true
    );
  }
  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    return generalResponse(res, 403, {}, "Sorry credential are invalid", true);
  }
  const token = jwt.sign({ id: user.id }, JWT_SECRET || "random123");

  return generalResponse(res, 200, { token }, "User logged in successfully");
};

export const signUp = async (req: Request, res: Response) => {
  const { email, name, number, password } = req.body;

  const userExists = await prismaClient?.user?.findFirst({
    where: {
      email,
    },
  });

  if (userExists) {
    return generalResponse(res, 400, {}, "User Already Exists", true);
  }

  const hashedPassword = await bcrypt?.hashSync(password, 10);

  await prismaClient?.user?.create({
    data: {
      email,
      name,
      number,
      password: hashedPassword,
    },
  });

  return generalResponse(
    res,
    201,
    {},
    "User created successfully, Please Verify email",
    true
  );
};

export const user = async (req: Request, res: Response) => {
  const { id } = req.body;

  const user = await prismaClient?.user?.findFirst({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      email: true,
    },
  });

  return generalResponse(
    res,
    201,
    user,
    "User created successfully, Please Verify email",
    true
  );
};
