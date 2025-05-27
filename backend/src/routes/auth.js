const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/authController');

// POST login
router.post('/login', authCtrl.login);

module.exports = router;