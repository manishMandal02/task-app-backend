const login = require('../controllers/auth/login');

const express = require('express');

const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/login', login);

module.exports = router;
