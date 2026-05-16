import { Router } from "express";
import { getUserById, loginUser, logoutUser, registerController } from "../controller/auth.controller.js";

const router = Router();

router.post("/register", registerController);

router.post("/login", loginUser);

router.get("/logout", logoutUser);

router.get("/:id", getUserById);

export default router;