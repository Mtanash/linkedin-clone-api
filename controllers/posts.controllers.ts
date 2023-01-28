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

export const likePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { post, user }: { post: string; user: string } = req.body;

    if (!post || !user)
      return res
        .status(404)
        .json({
          status: "failed",
          message: "Please provide post id and user id",
        });

    const targetPost = await PostModel.findById(post);
    const targetUser = await UserModel.findById(user);

    if (!targetPost || !targetUser)
      return res
        .status(400)
        .json({ status: "failed", message: "No post or user found" });

    targetPost.likes.push(targetUser._id);
    targetUser.likedPosts.push(targetPost._id);

    await targetPost.save();
    await targetUser.save();

    res
      .status(200)
      .json({ status: "success", message: "Post liked successfully" });
  } catch (error) {
    next(error);
  }
};
