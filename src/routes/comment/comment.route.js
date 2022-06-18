const express = require('express');
const {
  createComment,
  getAllTaskComment,
  deleteComment,
} = require('../../controllers/comment/comment.controller');

const { protect } = require('../../middleware/auth');

const router = express.Router();

router.route('/').post(protect, createComment);
router.route('/:id').delete(protect, deleteComment);
router.route('/task/:id').get(protect, getAllTaskComment);

module.exports = router;
