import AnswerService from '../services/answerService.js';

class AnswerController {
  // Save answers
  static async saveAnswers(req, res) {
    try {
      const answers = await AnswerService.saveAnswers(req.body);
      res.status(201).json(answers);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  // Get answers for a quiz
  static async getAnswersForQuiz(req, res) {
    try {
      const answers = await AnswerService.getAnswersForQuiz(req.query.quizId);
      res.status(200).json(answers);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
}

export const { saveAnswers, getAnswersForQuiz } = AnswerController;
