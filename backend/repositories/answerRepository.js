import Answer from '../models/answer.js';

class AnswerRepository {

  static async createOrUpdate(answerData) {

    const existingAnswer = await Answer.findOne({ quiz_id: answerData.quiz_id });

    if (existingAnswer) {
      return Answer.findByIdAndUpdate(existingAnswer._id, answerData, { new: true });
    }

    const answer = new Answer(answerData);
    return answer.save();
  }

  static async findByQuizId(quizId) {
    return Answer.find({ quiz_id: quizId });
  }
}

export default AnswerRepository;
