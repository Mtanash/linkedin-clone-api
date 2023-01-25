import { NextFunction, Request, Response } from "express";
import Post from "../types/post.type";
import PostModel from "../models/post.model";
import UserModel from "../models/user.model";
import { Types } from "mongoose";

export const createPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { text, userId, image }: Post = req.body;

    if (!Types.ObjectId.isValid(userId))
      return res
        .status(404)
        .json({ status: "error", message: "Please provide a valid user ID." });

    const post = await PostModel.create({ userId, text, image });

    const user = await UserModel.findById(userId);

    if (!user)
      return res
        .status(404)
        .json({ status: "error", message: "user not found." });

    user.posts.push(post._id);

    await user.save();

    res
      .status(201)
      .json({
        status: "success",
        message: "post created successfully",
        data: post,
      });
  } catch (error) {
    next(error);
  }
};
