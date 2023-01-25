import { Schema, Types, model } from "mongoose";

interface IPost {
  userId: Types.ObjectId;
  text: string;
  image?: string;
}

const postSchema = new Schema<IPost>(
  {
    userId: {
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
  },
  {
    timestamps: true,
  }
);

const PostModel = model<IPost>("Post", postSchema);

export default PostModel;
