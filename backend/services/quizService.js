import Quiz from '../models/quiz.js';

class QuizService {
  
  static async getAllQuizzes(page, limit) {
    const skip = (page - 1) * limit;

    const quizzes = await Quiz.find().skip(skip).limit(limit);
    const total = await Quiz.countDocuments();

    return { quizzes, total };
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