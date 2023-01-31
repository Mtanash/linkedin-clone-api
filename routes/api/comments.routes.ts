import { Router } from "express";
import {
  addComment,
  getComments,
  getComment,
} from "../../controllers/comments.controllers";
import authenticationMiddleware from "../../middleware/authentication.middleware";

const routes = Router();
// api/users
routes.route("/").post(authenticationMiddleware, addComment);
routes.route("/").get(authenticationMiddleware, getComments);
routes.route("/:postId").get(authenticationMiddleware, getComment);

export default routes;
