import bcrypt from "bcrypt";
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

    const accessToken = UserModel.generateAccessToken(
      user._id.toString(),
      user.email
    );

    res.status(201).json({
      status: "success",
      message: "User created successfully",
      data: { user, accessToken },
    });
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await UserModel.find();

    res
      .status(200)
      .json({ status: "success", message: "success", data: users });
  } catch (error) {
    next(error);
  }
};

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId: string = req.params.userId;

    const user = await UserModel.findById(userId);

    if (!user)
      res.status(400).json({ status: "error", message: "user not found" });

    res.status(200).json({ status: "success", message: "success", data: user });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password }: { email: string; password: string } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user)
      return res.status(400).json({
        status: "error",
        message: "user email or password are incorrect",
      });

    const passwordMatch = bcrypt.compare(password, user.password);

    if (!passwordMatch)
      return res.status(400).json({
        status: "error",
        message: "user email or password are incorrect",
      });

    const accessToken = UserModel.generateAccessToken(
      user._id.toString(),
      user.email
    );

    res.status(200).json({
      status: "success",
      message: "login successful",
      data: { user, accessToken },
    });
  } catch (error) {
    next(error);
  }
};
