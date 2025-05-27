const express = require('express');
const router = express.Router();
const routingCtrl = require('../controllers/routingController');

// POST route calculation
router.post('/', routingCtrl.calculateRoute);

module.exports = router;