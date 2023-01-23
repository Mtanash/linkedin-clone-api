import { Router } from "express";
import { createUser } from "../../controllers/users.controllers";
import authenticationMiddleware from "../../middleware/authentication.middleware";

const routes = Router();
// api/users
routes.route("/").post(createUser);
// routes.route('/').get(authenticationMiddleware, controllers.getMany)
// routes.route('/:id').get(authenticationMiddleware, controllers.getOne)
// routes.route('/:id').patch(authenticationMiddleware, controllers.updateOne)
// routes.route('/:id').delete(authenticationMiddleware, controllers.deleteOne)
// // authentication
// routes.route('/authenticate').post(controllers.authenticate)

export default routes;
