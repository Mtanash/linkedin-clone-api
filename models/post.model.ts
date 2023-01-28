import { Schema, Types, model } from "mongoose";

interface IPost {
  user: Types.ObjectId;
  text: string;
  image?: string;
  likes: Types.ObjectId[];
}

const postSchema = new Schema<IPost>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    text: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const PostModel = model<IPost>("Post", postSchema);

export default PostModel;
