import express from "express";
import { uploadImage, getAllImages } from "../controllers/imageController.js";

const imageRouter = express.Router();

imageRouter.route("/").post(uploadImage).get(getAllImages);

export { imageRouter };
