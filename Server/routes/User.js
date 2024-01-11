import express from "express";
import { login, logout, signUp } from "../controller/User";

const router = express();

// this route for signup
router.post("/signUp", signUp);

// this route for sinin
router.post("/login", login);

// logout user
router.post("/logout", logout);

export default router;
