import QuizService from '../services/quizService.js';

class QuizController {

  // Get all quizzes
  static async getAllQuizzes(req, res) {
    try {
      const quizzes = await QuizService.getAllQuizzes();
      res.status(200).json(quizzes);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  // Get quiz by id
  static async getQuizById(req, res) {
    try {
      const quiz = await QuizService.getQuizById(req.params.id);
      if (!quiz) {
        return res.status(404).json({ error: 'Quiz not found' });
      }
      res.status(200).json(quiz);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  // Create a new quiz
  static async createQuiz(req, res) {
    try {
      const quiz = await QuizService.createQuiz(req.body);
      res.status(201).json(quiz);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
  // Update a quiz
  static async updateQuiz(req, res) {
    try {
      const quiz = await QuizService.updateQuiz(req.params.id, req.body);
      if (!quiz) {
        return res.status(404).json({ error: 'Quiz not found' });
      }
      res.status(200).json(quiz);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  // Delete a quiz
  static async deleteQuiz(req, res) {
    try {
      const result = await QuizService.deleteQuiz(req.params.id);
      if (!result) {
        return res.status(404).json({ error: 'Quiz not found' });
      }
      res.status(200).json({ message: 'Quiz deleted successfully' });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
}

export const { getAllQuizzes, getQuizById, createQuiz, updateQuiz, deleteQuiz } = QuizController;

