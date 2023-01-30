import { NextFunction, Request, Response } from "express";
import CommentModel from "../models/comment.model";
import PostModel from "../models/post.model";
import { Types } from "mongoose";

export const addComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      postId,
      userId,
      text,
    }: { postId: string; userId: string; text: string } = req.body;

    if (!Types.ObjectId.isValid(postId) || !Types.ObjectId.isValid(userId))
      return res
        .status(404)
        .json({ status: "failed", message: "Invalid post id or user id." });

    if (!postId || !userId || !text)
      return res.status(404).json({
        status: "failed",
        message: "post id, user id and text are required",
      });

    const post = await PostModel.findById(postId);
    if (!post)
      return res
        .status(404)
        .json({ status: "failed", message: "No post found" });

    const comment = await CommentModel.create({
      user: userId,
      post: postId,
      text,
    });

    post.comments.push(comment._id);
    await post.save();

    res.status(201).json({
      status: "success",
      message: "comment created successfully",
      data: comment,
    });
  } catch (error) {
    next(error);
  }
};

export const getComments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const comments = await CommentModel.find().populate(
      "user",
      "_id firstName lastName avatar"
    );

    res.status(200).json({ status: "success", data: comments });
  } catch (error) {
    next(error);
  }
};
