const mongoose = require('mongoose');

const columnSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    color: {
      type: String,
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    tasks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Column = mongoose.model('Column', columnSchema);

module.exports = { Column };
