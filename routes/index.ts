import express from "express";
import usersRoutes from "./api/users.routes";
import postsRoutes from "./api/posts.routes";
import commentsRoutes from "./api/comments.routes";

const routes = express.Router();

routes.use("/users", usersRoutes);
routes.use("/posts", postsRoutes);
routes.use("/comments", commentsRoutes);

export default routes;
