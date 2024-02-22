import mongoose from "mongoose";

const songsSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		slug: {
			type: String,
			require: true,
		},
		artist: {
			type: String,
			required: true,
		},
		photo: {
			id: {
				type: String,
				required: true,
			},
			url: {
				type: String,
				required: true,
			},
		},
		playlist: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "playlists",
			required: true,
		},
		music: {
			id: {
				type: String,
				required: true,
			},
			url: {
				type: String,
				required: true,
			},
		},
	},
	{ timestamps: true }
);

export default mongoose.model("songs", songsSchema);
