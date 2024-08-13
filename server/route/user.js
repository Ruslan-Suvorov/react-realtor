import express from "express";
import {
  getProfile,
  googleSignIn,
  signin,
  signup,
} from "../controller/user.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/google-signin", googleSignIn);
router.get("/profile/:id", getProfile);

export default router;
