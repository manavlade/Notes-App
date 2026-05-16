import { Router } from "express";
import { createNote, deleteNote, getAllNotes, getSingleNote, updateNote } from "../controller/notes.controller.js";
import { isAuthenticated } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/create-note", isAuthenticated, createNote);

router.put("/note/:noteId", isAuthenticated, updateNote);

router.get("/notes", isAuthenticated, getAllNotes);

router.get("/note/:noteId", isAuthenticated, getSingleNote);

router.delete("/note/:noteId", isAuthenticated, deleteNote);

export default router;