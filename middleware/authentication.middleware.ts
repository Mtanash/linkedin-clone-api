import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import Error from "../interfaces/error.interface";
import dotenv from "dotenv";

dotenv.config();

const handleUnauthorizedError = (next: NextFunction) => {
  const error: Error = new Error("Login Error, Please login again");
  error.status = 401;
  next(error);
};

const validateTokenMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    const cookies = req.cookies;

    if (!cookies?.jwt) handleUnauthorizedError(next);

    const accessToken = cookies.jwt;

    const decode = jwt.verify(accessToken, process.env.JWT_SECRET as string);

    if (decode) {
      next();
    } else {
      // Failed to authenticate user.
      handleUnauthorizedError(next);
    }
  } catch (err) {
    handleUnauthorizedError(next);
  }
};

export default validateTokenMiddleware;
