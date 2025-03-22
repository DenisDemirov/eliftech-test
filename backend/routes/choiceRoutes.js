import express from 'express';

const router = express.Router();

import {
  createChoice,
  getAllChoices,
  getChoiceById,
  updateChoice,
  deleteChoice,
}from '../controllers/choiceController.js';


router.post('/', createChoice);
router.get('/', getAllChoices);
router.get('/:id', getChoiceById);
router.put('/:id', updateChoice);
router.delete('/:id', deleteChoice);

export default router;
