import { Router } from "express";
import { createPost } from "../../controllers/posts.controllers";
import authenticationMiddleware from "../../middleware/authentication.middleware";

const routes = Router();
// api/users
routes.route("/").post(authenticationMiddleware, createPost);

export default routes;
