import Quiz from '../models/quiz.js';

class QuizRepository {
  static async create(quizData) {
    const quiz = new Quiz(quizData);
    return quiz.save();
  }

  static async findById(id) {
    return Quiz.findById(id);
  }

  static async findAll() {
    return Quiz.find();
  }
}

export default QuizRepository;