import mongoose from 'mongoose';

const GoalSchema = new mongoose.Schema({
  goal: {
    type: String,
    required: 'One goal is required',
  },
  completed: {
    type: Boolean,
    default: false,
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Goal', GoalSchema);
