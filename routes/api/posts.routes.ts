import { Router } from "express";
import { createPost, getPosts } from "../../controllers/posts.controllers";
import authenticationMiddleware from "../../middleware/authentication.middleware";

const routes = Router();
// api/users
routes.route("/").post(authenticationMiddleware, createPost);
routes.route("/").get(authenticationMiddleware, getPosts);

export default routes;
