import { Router } from "express";
import {
  addComment,
  getComments,
} from "../../controllers/comments.controllers";
import authenticationMiddleware from "../../middleware/authentication.middleware";

const routes = Router();
// api/users
routes.route("/").post(authenticationMiddleware, addComment);
routes.route("/").get(authenticationMiddleware, getComments);

export default routes;
