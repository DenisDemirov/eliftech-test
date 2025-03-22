import Choice from '../models/choice.js';

class ChoiceRepository {
  static async findByQuizId(quizId) {
    return Choice.find({ quiz_id: quizId });
  }

  static async create(choiceData) {
    const choice = new Choice(choiceData);
    return choice.save();
  }
}

export default ChoiceRepository;
