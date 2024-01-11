import express from "express";
import { signUp } from "../controller/User";

const router = express();

// this route for signup
router.post("/signUp", signUp);

// this route for sinin
router.post("/login", login);


export default router;
