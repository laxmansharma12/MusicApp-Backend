import SongsModel from "../Models/songs.js";
import slugify from "slugify";
import cloudinary from "../utils/cloudinary.js";

export const createMusicController = async (req, res) => {
	try {
		const { name, artist, playlist } = req.fields;
		const { music, photo } = req.files;

		//validation
		switch (true) {
			case !name:
				return res.status(500).send({ error: "Name is Required" });
			case !artist:
				return res.status(500).send({ error: "artist is Required" });
			case !playlist:
				return res.status(500).send({ error: "playlist is Required" });
		}

		//save
		const uploadOptions = { folder: "MyMusicApp" };

		const img = await cloudinary.uploader.upload(photo.path, uploadOptions);
		const audio = await cloudinary.uploader.upload(music.path, {
			...uploadOptions,
			resource_type: "raw",
		});

		const songs = new SongsModel({
			...req.fields,
			photo: { id: img.public_id, url: img.secure_url },
			music: { id: audio.public_id, url: audio.secure_url },
			slug: slugify(name),
		});

		await songs.save();
		res.status(201).send({
			success: true,
			message: "music Added Successfully!",
			songs,
		});
	} catch (error) {
		console.log(error);
		res.status(500).send({
			success: false,
			message: "Error in Adding music",
		});
	}
};

//get all music controller
export const getAllMusicController = async (req, res) => {
	try {
		const songs = await SongsModel.find({}).sort({ createdAt: -1 });
		res.status(200).send({
			success: true,
			counTotal: songs.length,
			message: "All Songs",
			songs,
		});
	} catch (error) {
		console.log(error);
		res.status(500).send({
			success: false,
			message: "Erorr in getting music",
			error: error.message,
		});
	}
};

//get single music controller
export const getSingleMusicController = async (req, res) => {
	try {
		const music = await SongsModel.findOne({ slug: req.params.slug }).populate(
			"playlist"
		);
		res.status(200).send({
			success: true,
			message: "Single music Fetched",
			music,
		});
	} catch (error) {
		console.log(error);
		res.status(500).send({
			success: false,
			message: "Erorr in getting single music",
			error: error.message,
		});
	}
};

// search music
export const searchMusicController = async (req, res) => {
	try {
		const { keyword } = req.params;
		const results = await SongsModel.find({
			$or: [{ name: { $regex: keyword, $options: "i" } }],
			$or: [{ artist: { $regex: keyword, $options: "i" } }],
		});
		res.json(results);
	} catch (error) {
		console.log(error);
		res.status(400).send({
			success: false,
			message: "Error In Search music API",
			error,
		});
	}
};
