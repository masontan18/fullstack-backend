import express from "express";
const usersRouter = express.Router();
import { getAllUsers, createNewUser, updateUser, deleteUser, getUser } from "../controllers/usersController.js";

usersRouter
  .route("/")
  .get(getAllUsers)
  .post(createNewUser)
  .put(updateUser)
  .delete(deleteUser);

usersRouter.route("/:id").get(getUser);

export { usersRouter }
