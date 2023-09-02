import express from "express";
import { uploadImage, getAllImages } from "../controllers/imageController.js";
import { verifyJwt } from "../middlewares/verifyJwt.js";

const imageRouter = express.Router();

imageRouter.route("/").post(verifyJwt, uploadImage).get(getAllImages);

export { imageRouter };
