import { Request, Response, NextFunction } from "express";
import UserModel from "../models/user.model";
import User from "../types/user.type";
import jwt from "jsonwebtoken";

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { firstName, lastName, email, password, avatar }: User = req.body;

    const user = await UserModel.create({
      firstName,
      lastName,
      email,
      password,
      avatar,
    });

    const TOKEN_SECRET = process.env.TOKEN_SECRET as string;
    const accessToken = jwt.sign(
      { id: user._id, email: user.email },
      TOKEN_SECRET
    );

    res.status(201).json({
      status: "success",
      message: "User created successfully",
      data: { user, accessToken },
    });
  } catch (error) {
    throw new Error("Error: create user failed" + (error as Error).message);
  }
};
