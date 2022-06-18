const express = require('express');
const { createTask, getATask, getAllUserTask } = require('../../controllers/task/task.controller');

const { protect } = require('../../middleware/auth');

const router = express.Router();

router.route('/').post(protect, createTask);
router.route('/:id').get(protect, getATask);
router.route('/user/:id').get(protect, getAllUserTask);

module.exports = router;
