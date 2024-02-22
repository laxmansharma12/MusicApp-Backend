import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./Config/db.js";
import cors from "cors";
import authRoutes from "./Routes/authRoutes.js";
import playlistRoutes from "./Routes/playlistRoutes.js";
import musicRoutes from "./Routes/musicRoutes.js";

//confugure env
dotenv.config();

//database config
connectDB();

//rest object
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//routes

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/music", musicRoutes);
app.use("/api/v1/playlist", playlistRoutes);

//rest api
app.get("/", (req, res) => {
	res.send("Welcome to MyMusic App");
});

//PORT
const PORT = process.env.PORT || 3000;

//run listen
app.listen(PORT, (req, res) => {
	console.log(`Server running on ${PORT}`);
});
