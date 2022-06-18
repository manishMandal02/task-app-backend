const mongoose = require('mongoose');

const projectSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: false,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    coverImage: {
      type: String,
      required: true,
    },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    tasks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
      },
    ],
    columns: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Column',
      },
    ],
    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model('Project', projectSchema);

module.exports = { Project };
