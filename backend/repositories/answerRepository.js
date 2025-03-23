import Answer from '../models/answer.js';

class AnswerRepository {

  static async createOrUpdate(answerData) {
    
    const answer = new Answer(answerData);
    return answer.save();
  }

  static async findByQuizId(quizId) {
    return Answer.find({ quiz_id: quizId });
  }
}

export default AnswerRepository;
