import express from "express";

const router = express.Router();

import {
  createQuiz,
  getAllQuizzes,
  getQuizById,
  updateQuiz,
  deleteQuiz,
} from "../controllers/quizController.js";



router.post("/", createQuiz);
router.get("/", getAllQuizzes);
router.get("/:id", getQuizById);
router.put("/:id", updateQuiz);
router.delete("/:id", deleteQuiz);

export default router;