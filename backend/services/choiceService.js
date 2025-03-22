import Choice from '../models/choice.js';

class ChoiceService {
  static async getQuestionsForQuiz(quizId) {
    return await Choice.find({ quizId });
  }

  static async getChoiceById(id) {
    return await Choice.findById(id);
  }

  static async createQuestion(data) {
    const choice = new Choice(data);
    return await choice.save();
  }

  static async updateChoice(id, data) {
    return await Choice.findByIdAndUpdate(id, data, { new: true });
  }

  static async deleteChoice(id) {
    return await Choice.findByIdAndDelete(id);
  }
}

export default ChoiceService;
