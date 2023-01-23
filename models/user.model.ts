import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

// 1. Create an interface representing a document in MongoDB.
interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  avatar?: string;
}

// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema<IUser>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    avatar: String,
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  const user = this;
  if (this.isModified("password")) {
    const saltRounds = process.env.SALT_ROUNDS as string;
    const hashedPassword = await bcrypt.hash(
      user.password,
      parseInt(saltRounds)
    );
    user.password = hashedPassword;
    next();
  } else {
    next();
  }
});

// 3. Create a Model.
const User = model<IUser>("User", userSchema);

export default User;
