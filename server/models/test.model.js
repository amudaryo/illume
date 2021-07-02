import mongoose from 'mongoose';

const TestSchema = new mongoose.Schema({
  text: {
    type: String,
    required: 'text is required',
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Test', TestSchema);
