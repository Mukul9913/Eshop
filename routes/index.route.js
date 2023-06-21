import express from "express";
import { indexPage, signinPage, signupPage, signUp, signIn, signout } from "../controller/index.controller.js";
import { verify } from "../public/middleware/authenticate.js"
const router = express.Router();
import { body } from "express-validator";

// htto://localhost:3001/
router.get("/", indexPage);
router.get("/signIn", signinPage);
router.get("/signUp", signupPage);
router.post("/signUp", signUp)
router.post("/signIn", signIn);
router.get("/signOut", verify, signout);
export default router;