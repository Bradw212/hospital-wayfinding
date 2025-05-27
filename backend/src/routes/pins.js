const express = require('express');
const router = express.Router();
const pinCtrl = require('../controllers/pinController');

// POST add pin
router.post('/', pinCtrl.add);
// PUT edit pin
router.put('/:id', pinCtrl.edit);
// DELETE a pin
router.delete('/:id', pinCtrl.delete);

module.exports = router;