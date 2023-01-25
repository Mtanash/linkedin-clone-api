import express from "express";
import usersRoutes from "./api/users.routes";
import postsRoutes from "./api/posts.routes";

const routes = express.Router();

routes.use("/users", usersRoutes);
routes.use("/posts", postsRoutes);

export default routes;
