import express from "express";
import {
  createComment,
  deleteComment,
  deleteReply,
  getComments,
} from "../controller/comment.js";
const router = express.Router();

router.post("/create-comment", createComment);
router.get("/comments/:id", getComments);

router.delete("/delete-comment/:id", deleteComment);
router.patch("/delete-reply/:id", deleteReply);

export default router;
