import mongoose from 'mongoose';

const choiceSchema = new mongoose.Schema({
  position: {
    type: Number,
    required: true
  },
  question_text: {
    type: String,
    required: true
  },
  is_single_answer: {
    type: Boolean,
    default: false
  },
  options: {
    type: [String],
    default: []
  },
  quiz_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quiz',
    required: true
  }
}, { timestamps: true });

const Choice = mongoose.model('Choice', choiceSchema);

export default Choice;
