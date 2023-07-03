import express from "express";
import { VerifyToken } from "../../config/VerifyToken.js";
import { CreateStickyNotes, DeleteAllStickyNotes, DeleteStickyNotes, GetAllStickyNotes, GetStickyNotes } from "../../controllers/stickynotes/StickyNotes.js";



export const StickyNotesRouter = express.Router();

StickyNotesRouter.post("/createStickyNotes", VerifyToken, CreateStickyNotes);
StickyNotesRouter.get("/getAllStickyNotes",VerifyToken, GetAllStickyNotes);
StickyNotesRouter.get("/getStickyNotes", VerifyToken, GetStickyNotes);
StickyNotesRouter.delete("/stickyNotes/delete/:id", VerifyToken, DeleteStickyNotes);
StickyNotesRouter.delete("/stickyNotes/delete/", VerifyToken, DeleteAllStickyNotes);

