import Quiz from '../models/quiz.js';

class QuizService {
  static async getAllQuizzes() {
    return await Quiz.find();
  }

  static async getQuizById(id) {
    return await Quiz.findById(id);
  }

  static async createQuiz(data) {
    const quiz = new Quiz(data);
    return await quiz.save();
  }

  static async updateQuiz(id, data) {
    return await Quiz.findByIdAndUpdate(id, data, { new: true });
  }

  static async deleteQuiz(id) {
    return await Quiz.findByIdAndDelete(id);
  }
}

export default QuizService;