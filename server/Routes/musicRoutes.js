import express from "express";
import formidable from "express-formidable";
import {
	createMusicController,
	getAllMusicController,
	getSingleMusicController,
	searchMusicController,
} from "../controllers/musicControllers.js";

const router = express.Router();

//---------------routes-----------------------

//create music
router.post("/create-music", formidable(), createMusicController);

//get all music
router.get("/get-music", getAllMusicController);

//get single music
router.get("/get-music/:slug", getSingleMusicController);

//search song
router.get("/search/:keyword", searchMusicController);

export default router;
