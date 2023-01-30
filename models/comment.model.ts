import { Schema, Types, model } from "mongoose";

interface IComment {
  user: Types.ObjectId;
  post: Types.ObjectId;
  text: string;
}

const commentSchema = new Schema<IComment>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    post: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Post",
    },
    text: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const CommentModel = model<IComment>("Comment", commentSchema);

export default CommentModel;
