const express = require('express');
const router = express.Router();
const mapCtrl = require('../controllers/mapController');
const upload = require('../utils/upload');

// GET all maps
router.get('/', mapCtrl.getAll);
// POST upload new map
router.post('/', upload.single('file'), mapCtrl.upload);
// PUT edit map (walkableGrid, etc)
router.put('/:id', mapCtrl.edit);
// DELETE a map
router.delete('/:id', mapCtrl.delete);

module.exports = router; });