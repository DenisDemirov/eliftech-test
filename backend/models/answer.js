import mongoose from 'mongoose';

const answerSchema = new mongoose.Schema({
  answers: [{
    question_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Choice',
      required: true
    },
    answer: {
      type: String,
      required: true
    }
  }],
  quiz_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quiz',
    required: true
  }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

const Answer = mongoose.model('Answer', answerSchema);

export default Answer;
