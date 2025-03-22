import express from 'express';

const router = express.Router();

import {
  saveAnswers,
  getAnswersForQuiz
} from '../controllers/answerController.js';


router.post('/', saveAnswers);
router.get('/', getAnswersForQuiz);

export default router;

