import express from "express";
import { uploadImage, getAllImages, deleteImage, getUserImages, getAnImage, updateImage } from "../controllers/imageController.js";
import { verifyJwt } from "../middlewares/verifyJwt.js"

const imageRouter = express.Router();

imageRouter.route("/").post(uploadImage).get(getAllImages).delete(verifyJwt, deleteImage).put(verifyJwt ,updateImage);

imageRouter.route("/:id").get(getUserImages)

imageRouter.route("/manage/:id").get(getAnImage)

export { imageRouter };
