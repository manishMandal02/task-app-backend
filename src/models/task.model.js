const mongoose = require("mongoose");

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
    project: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Project",
    },
    assignedBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    assignedTo: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    column: {
      type: String,
      require: true,
    },
    category: {
      type: String,
      required: true,
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model("Task", taskSchema);

module.exports = { Task };
