import express from "express";
import {
	createPlaylistController,
	playlistController,
} from "../controllers/playlistControllers.js";
import formidable from "express-formidable";

const router = express.Router();

//routes
// create playlsit
router.post("/create-playlist", formidable(), createPlaylistController);

//getALl playlsit
router.get("/get-playlist", playlistController);

//single playlsit
// router.get("/single-playlsit/:slug", singleCategoryController);

//delete playlsit
// router.delete(
// 	"/delete-playlsit/:id",
// 	deleteCategoryCOntroller
// );

export default router;
