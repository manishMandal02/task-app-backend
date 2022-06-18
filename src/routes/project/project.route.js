const express = require('express');
const { createProject, getAProject, getAllUserProject } = require('../../controllers/project/project.controller');

const { protect } = require('../../middleware/auth');

const router = express.Router();

router.route('/').post(protect, createProject);
router.route('/:id').get(protect, getAProject);
router.route('/user/:id').get(protect, getAllUserProject);

module.exports = router;
