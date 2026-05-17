import { Router } from "express";
import { createNote, deleteNote, getAllNotes, getSingleNote, updateNote } from "../controller/notes.controller.js";
import { isAuthenticated } from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.middleware.js";

const router = Router();

router.post("/", isAuthenticated, upload.single("image"), createNote);

router.get("/", isAuthenticated, getAllNotes);

router.get("/:noteId", isAuthenticated, getSingleNote);

router.put("/:noteId", isAuthenticated, upload.single("image"), updateNote);

router.delete("/:noteId", isAuthenticated, deleteNote);

export default router;