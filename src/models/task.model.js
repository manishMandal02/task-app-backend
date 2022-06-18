const mongoose = require('mongoose');

const taskSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: false,
    },

    assignedBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    assignedTo: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
      },
    ],
    column: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Column',
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Category',
    },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model('Task', taskSchema);

module.exports = { Task };
