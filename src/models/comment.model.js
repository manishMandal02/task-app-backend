const mongoose = require('mongoose');

const commentSchema = mongoose.Schema(
  {
    comment: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    task: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Task',
    },
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model('Comment', commentSchema);

module.exports = { Comment };
