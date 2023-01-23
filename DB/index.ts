import mongoose from "mongoose";

mongoose.set("strictQuery", false);
const connectToMongoDB = (): Promise<typeof mongoose> => {
  const mongoDBUrl = process.env.MONGODB_URL;
  if (!mongoDBUrl) return Promise.reject(new Error("Invalid MongoDB URL"));
  return mongoose.connect(mongoDBUrl);
};

export default connectToMongoDB;
