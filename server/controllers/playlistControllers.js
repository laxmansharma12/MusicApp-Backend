import playlistModel from "../Models/playlists.js";
import slugify from "slugify";
import cloudinary from "../utils/cloudinary.js";

// get all playlist
export const playlistController = async (req, res) => {
	try {
		const playlist = await playlistModel.find({});
		res.status(200).send({
			success: true,
			message: "All Playlists List",
			playlist,
		});
	} catch (error) {
		console.log(error);
		res.status(500).send({
			success: false,
			error,
			message: "Error while getting all Playlists",
		});
		authRoutes;
	}
};

export const createPlaylistController = async (req, res) => {
	try {
		const { name, owner } = req.fields;
		//validation
		const { photo } = req.files;

		// Get the path to the uploaded file
		const filePath = photo.path;

		const existingplaylist = await playlistModel.findOne({ name });
		if (existingplaylist) {
			return res.status(200).send({
				success: false,
				message: "Playlist Already Exisits",
			});
		}

		//save
		const img = await cloudinary.uploader.upload(filePath, {
			folder: "MyMusicApp",
		});

		const playlist = await new playlistModel({
			...req.fields,
			slug: slugify(name),
			photo: { id: img.public_id, url: img.secure_url },
		}).save();
		res.status(201).send({
			success: true,
			message: "new playlist created",
			playlist,
		});
	} catch (error) {
		console.log(error);
		res.status(500).send({
			success: false,
			error,
			message: "Errro in playlist",
		});
	}
};

//update playlist
// export const updateCategoryController = async (req, res) => {
// 	try {
// 		const { name } = req.body;
// 		const { id } = req.params;
// 		const playlist = await playlistModel.findByIdAndUpdate(
// 			id,
// 			{ name, slug: slugify(name) },
// 			{ new: true }
// 		);
// 		res.status(200).send({
// 			success: true,
// 			messsage: "playlist Updated Successfully",
// 			playlist,
// 		});
// 	} catch (error) {
// 		console.log(error);
// 		res.status(500).send({
// 			success: false,
// 			error,
// 			message: "Error while updating playlist",
// 		});
// 	}
// };

// single playlist
// export const singleCategoryController = async (req, res) => {
// 	try {
// 		const playlist = await playlistModel.findOne({ slug: req.params.slug });
// 		res.status(200).send({
// 			success: true,
// 			message: "Get SIngle playlist SUccessfully",
// 			playlist,
// 		});
// 	} catch (error) {
// 		console.log(error);
// 		res.status(500).send({
// 			success: false,
// 			error,
// 			message: "Error While getting Single playlist",
// 		});
// 	}
// };

//delete playlist
// export const deleteCategoryCOntroller = async (req, res) => {
// 	try {
// 		const { id } = req.params;
// 		await playlistModel.findByIdAndDelete(id);
// 		res.status(200).send({
// 			success: true,
// 			message: "Categry Deleted Successfully",
// 		});
// 	} catch (error) {
// 		console.log(error);
// 		res.status(500).send({
// 			success: false,
// 			message: "error while deleting playlist",
// 			error,
// 		});
// 	}
// };
