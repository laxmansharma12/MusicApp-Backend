import mongoose from "mongoose";

const playlistSchema = new mongoose.Schema({
	name: {
		type: String,
	},
	slug: {
		type: String,
		lowercase: true,
	},
});

export default mongoose.model("playlists", playlistSchema);
