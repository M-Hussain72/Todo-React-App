import mongoose from 'mongoose';

const TodoSchema = mongoose.Schema(
  {
    note: {
      type: String,
      required: true,
    },
    isComplete: {
      type: Boolean,
      required: true,
    },
  },
  {
    Timestamp: true,
  }
);
export const Todo = mongoose.model('Todo', TodoSchema);
