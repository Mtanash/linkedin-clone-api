import jwt from "jsonwebtoken";
import { Model, Schema, Types, model } from "mongoose";
import bcrypt from "bcrypt";
import isEmail from "validator/lib/isEmail";
import dotenv from "dotenv";

dotenv.config();

// 1. Create an interface representing a document in MongoDB.
interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  avatar?: string;
  posts: Types.ObjectId[];
  likedPosts: Types.ObjectId[];
}

interface IUserModel extends Model<IUser> {
  authenticate: (email: string, password: string) => Promise<IUser | null>;
  generateAccessToken: (id: string, email: string) => string;
}

// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema<IUser, IUserModel>(
  {
    firstName: {
      type: String,
      required: [true, "Please provide a first name"],
      minLength: [3, "Please provide a minimum length of 4 characters"],
    },
    lastName: {
      type: String,
      required: [true, "Please provide a last name"],
      minLength: [3, "Please provide a minimum length of 4 characters"],
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      minLength: [3, "Please provide a minimum length of 4 characters"],
      trim: true,
      lowercase: true,
      unique: true,
      validate: {
        validator: function (v: string) {
          return isEmail(v);
        },
        message: (props) => `${props.value} is not a valid email!`,
      },
    },
    password: { type: String, required: [true, "Please provide a password"] },
    avatar: String,
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    likedPosts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.static(
  "authenticate",
  async function authenticate(email: string, password: string) {
    try {
      const User: IUserModel = this;
      const user = await User.findOne({ email: email.toLowerCase() });

      if (!user) throw new Error("Email or password are incorrect");

      const passwordMatched = bcrypt.compareSync(password, user.password);
      if (!passwordMatched) throw new Error("Email or password are incorrect");

      return user;
    } catch (error) {
      throw new Error(
        `Unable to Login: ${(error as { message: string }).message as string}`
      );
    }
  }
);

userSchema.static(
  "generateAccessToken",
  function generateAccessToken(id, email) {
    try {
      return jwt.sign({ id, email }, process.env.JWT_SECRET as string, {
        expiresIn: process.env.ACCESS_TOKEN_TIME_HOURES as string,
      });
    } catch (error) {
      throw new Error(`Something went wrong. ${(error as Error).message}`);
    }
  }
);

userSchema.pre("save", function (next) {
  const user = this;
  if (this.isModified("password")) {
    const saltRounds = process.env.SALT_ROUNDS as string;
    const hashedPassword = bcrypt.hashSync(user.password, parseInt(saltRounds));
    user.password = hashedPassword;
  }
  next();
});

// 3. Create a Model.
const UserModel = model<IUser, IUserModel>("User", userSchema);

export default UserModel;
