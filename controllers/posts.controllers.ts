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
    const { text, user, image }: Post = req.body;

    if (!Types.ObjectId.isValid(user))
      return res
        .status(404)
        .json({ status: "error", message: "Please provide a valid user ID." });

    const post = await PostModel.create({ user, text, image });

    const userObject = await UserModel.findById(user);

    if (!userObject)
      return res
        .status(404)
        .json({ status: "error", message: "user not found." });

    userObject.posts.push(post._id);

    await userObject.save();

    res.status(201).json({
      status: "success",
      message: "post created successfully",
      data: post,
    });
  } catch (error) {
    next(error);
  }
};

export const getPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const posts = await PostModel.find()
      .populate("user", "avatar firstName lastName")
      .sort("-createdAt");

    res.status(200).json({ status: "success", data: posts });
  } catch (error) {
    next(error);
  }
};
