import Choice from '../models/choice.js';

class ChoiceService {
  static async getQuestionsForQuiz(quizId) {
    return await Choice.find({ quiz_id: quizId });
  }

  static async getChoiceById(id) {
    return await Choice.findById(id);
  }

  static async createQuestion(data) {
    const choice = new Choice(data);
    return await choice.save();
  }

  static async createChoices(data) {
    return await Choice.insertMany(data);
  }

  static async updateChoice(id, data) {
    return await Choice.findByIdAndUpdate(id, data, { new: true });
  }

  static async updateChoices(choicesData) {
    const updatedChoices = [];
    for (const choiceData of choicesData) {
      let updatedChoice = await Choice.findById(choiceData.id);
      if (updatedChoice) {
        updatedChoice = await Choice.findByIdAndUpdate(choiceData.id, choiceData, { new: true });
      } else {
        updatedChoice = new Choice(choiceData);
        await updatedChoice.save();
      }
      updatedChoices.push(updatedChoice);
    }
    return updatedChoices;
  }
}

export default ChoiceService;
