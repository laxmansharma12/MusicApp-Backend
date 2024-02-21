import mongoose from "mongoose";

const songsSchema = new mongoose.Schema(
	{
		title: {
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
	},
	{ timestamps: true }
);

export default mongoose.model("foods", songsSchema);
