
import express from "express";
import { VerifyToken } from "../../config/VerifyToken.js";
import { GetAllSongs, UploadSong } from "../../controllers/songscontroller/Songs.js";


// ==================================================================

export const SongsRouter = express.Router();

SongsRouter.get("/allsongs", GetAllSongs);
SongsRouter.post("/uploadsong", VerifyToken, UploadSong);
