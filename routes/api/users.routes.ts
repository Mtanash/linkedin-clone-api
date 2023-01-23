import { Router } from "express";
import {
  createUser,
  getAllUsers,
  getUser,
} from "../../controllers/users.controllers";
import authenticationMiddleware from "../../middleware/authentication.middleware";

const routes = Router();
// api/users
routes.route("/").post(createUser);
routes.route("/").get(authenticationMiddleware, getAllUsers);
routes.route("/:userId").get(authenticationMiddleware, getUser);
// routes.route('/:id').patch(authenticationMiddleware, controllers.updateOne)
// routes.route('/:id').delete(authenticationMiddleware, controllers.deleteOne)
// // authentication
// routes.route('/authenticate').post(controllers.authenticate)

export default routes;
