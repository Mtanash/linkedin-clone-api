import { Router } from "express";
import {
  createPost,
  getPosts,
  likePost,
  getPostStats,
} from "../../controllers/posts.controllers";
import authenticationMiddleware from "../../middleware/authentication.middleware";

const routes = Router();
// api/users
routes.route("/").post(authenticationMiddleware, createPost);
routes.route("/").get(authenticationMiddleware, getPosts);
routes.route("/like").post(authenticationMiddleware, likePost);
routes.route("/:postId/stats").get(authenticationMiddleware, getPostStats);

export default routes;
