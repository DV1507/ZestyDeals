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
      OR: [{ email: username }, { name: username }, { number: username }],
    },
    select: {
      id: true,
      email: true,
      name: true,
      number: true,
      password: true,
      role: true,
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

  const userData = { ...user, password: undefined };
  const token = jwt.sign({ user: userData }, JWT_SECRET || "random123");

  return generalResponse(
    res,
    200,
    { success: true, token },
    "User logged in successfully",
    true
  );
};

export const signUp = async (req: Request, res: Response) => {
  const { email, name, number, password, role } = req.body;

  const existingUser = await prismaClient?.user?.findFirst({
    where: {
      OR: [{ email }, { name }, { number }],
    },
  });

  if (existingUser) {
    const conflictField =
      existingUser.email === email
        ? "Email"
        : existingUser.name === name
        ? "Username"
        : "Phone Number";

    return generalResponse(
      res,
      400,
      { success: false },
      `${conflictField} Already Exists`,
      true
    );
  }

  const hashedPassword = await bcrypt?.hashSync(password, 10);

  await prismaClient?.user?.create({
    data: {
      email,
      name,
      number,
      password: hashedPassword,
      role,
    },
  });

  return generalResponse(
    res,
    201,
    { success: true },
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
