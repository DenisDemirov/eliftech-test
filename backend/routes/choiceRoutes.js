import express from 'express';

const router = express.Router();

import {
  createChoice,
  createChoices,
  getAllChoices,
  getChoiceById,
  updateChoice,
  updateChoices,
  deleteChoice,
}from '../controllers/choiceController.js';


router.post('/', createChoice);
router.get('/quiz/:quizId', getAllChoices);
router.put('/bulk', updateChoices);
router.post('/bulk', createChoices);
router.get('/:id', getChoiceById);
router.put('/:id', updateChoice);
router.delete('/:id', deleteChoice);

export default router;
