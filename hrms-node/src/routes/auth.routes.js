const express = require('express');
const router = express.Router();

const { login, getMe, refreshToken } = require('../controllers/auth.controller');
const { authenticate } = require('../middlewares/auth.middleware');

router.post('/login', login);
router.post('/refresh', refreshToken);
router.get('/me', authenticate, getMe);

module.exports = router;