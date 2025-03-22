import express from "express";
import quizRoutes from "./quizRoutes.js";
import choiceRoutes from "./choiceRoutes.js";
import answerRoutes from "./answerRoutes.js";

const router = express.Router();

router.use("/quizzes", quizRoutes);
router.use("/choices", choiceRoutes);
router.use("/answers", answerRoutes);

export default router;
