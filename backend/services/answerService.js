import AnswerRepository from '../repositories/answerRepository.js';

class AnswerService {

  static async saveAnswers(answerData) {
    return AnswerRepository.createOrUpdate(answerData);
  }

  static async getAnswersForQuiz(quizId) {
    return AnswerRepository.findByQuizId(quizId);
  }
}

export default AnswerService;
