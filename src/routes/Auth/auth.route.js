const express = require('express');

const login = require('../../controllers/auth/login');
const googleAuth = require('../../controllers/auth/googleAuth');
const register = require('../../controllers/auth/register');
const updateUser = require('../../controllers/auth/updateUser');

const { protect } = require('../../middleware/auth');

const router = express.Router();

router.post('/login', login);
router.post('/google', googleAuth);
router.post('/', register);
router.post('/:id', updateUser);

module.exports = router;
