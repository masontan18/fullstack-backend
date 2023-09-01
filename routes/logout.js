import express from "express";
const logoutRouter = express.Router();
import { handleLogout } from "../controllers/logoutController.js";

logoutRouter.route("/").get(handleLogout)

export { logoutRouter }

