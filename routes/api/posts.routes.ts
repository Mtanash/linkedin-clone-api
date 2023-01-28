import { Router } from "express";
import {
  createPost,
  getPosts,
  likePost,
} from "../../controllers/posts.controllers";
import authenticationMiddleware from "../../middleware/authentication.middleware";

const routes = Router();
// api/users
routes.route("/").post(authenticationMiddleware, createPost);
routes.route("/").get(authenticationMiddleware, getPosts);
routes.route("/like").post(authenticationMiddleware, likePost);

export default routes;
