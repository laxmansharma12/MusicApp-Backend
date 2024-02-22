import mongoose from "mongoose";

const playlistSchema = new mongoose.Schema({
	name: {
		type: String,
	},
	slug: {
		type: String,
		lowercase: true,
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
});

export default mongoose.model("playlists", playlistSchema);
