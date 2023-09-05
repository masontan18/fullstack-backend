import express  from "express";
import { checkout } from "../controllers/checkoutController.js";

const checkoutRouter = express.Router()

checkoutRouter.route("/").post(checkout)

export { checkoutRouter }