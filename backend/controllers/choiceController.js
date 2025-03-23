import ChoiceService from '../services/choiceService.js';

class ChoiceController {

  // Get all questions for a quiz
  static async getAllChoices(req, res) {
    try {
      const questions = await ChoiceService.getQuestionsForQuiz(req.params.quizId);
      res.status(200).json(questions);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  // Get choice by id
  static async getChoiceById(req, res) {
    try {
      const choice = await ChoiceService.getChoiceById(req.params.id);
      if (!choice) {
        return res.status(404).json({ error: 'Choice not found' });
      }
      res.status(200).json(choice);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  // Create a new question
  static async createChoice(req, res) {
    try {
      const question = await ChoiceService.createQuestion(req.body);
      res.status(201).json(question);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  // Create multiple choices
  static async createChoices(req, res) {
    try {
      const choicesData = req.body.questions.map(choice => ({
        position: choice.position,
        question_text: choice.question_text,
        is_single_answer: choice.is_single_answer,
        options: choice.options,
        quiz_id: choice.quiz_id
      }));

      const choices = await ChoiceService.createChoices(choicesData);
      res.status(201).json(choices);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  // Update a choice
  static async updateChoice(req, res) {
    try {
      const choice = await ChoiceService.updateChoice(req.params.id, req.body);
      if (!choice) {
        return res.status(404).json({ error: 'Choice not found' });
      }
      res.status(200).json(choice);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  // Update multiple choices
  static async updateChoices(req, res) {
    try {
      const choicesData = req.body.questions.map(choice => ({
        id: choice._id || null,
        position: choice.position,
        question_text: choice.question_text,
        is_single_answer: choice.is_single_answer,
        options: choice.options,
        quiz_id: choice.quiz_id
      }));

      const updatedChoices = await ChoiceService.updateChoices(choicesData);
      res.status(200).json(updatedChoices);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  // Delete a choice
  static async deleteChoice(req, res) {
    try {
      const result = await ChoiceService.deleteChoice(req.params.id);
      if (!result) {
        return res.status(404).json({ error: 'Choice not found' });
      }
      res.status(200).json({ message: 'Choice deleted successfully' });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
}

export const { getAllChoices, getChoiceById, createChoice, createChoices, updateChoice, updateChoices, deleteChoice } = ChoiceController;
