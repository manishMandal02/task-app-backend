const mongoose = require('mongoose');

const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
    },
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model('Category', categorySchema);

module.exports = { Category };
