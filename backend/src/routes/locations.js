const express = require('express');
const router = express.Router();
const locationCtrl = require('../controllers/locationController');
const upload = require('../utils/upload');

// GET all locations
router.get('/', locationCtrl.getAll);
// POST add location
router.post('/', locationCtrl.add);
// PUT edit location
router.put('/:id', locationCtrl.edit);
// DELETE a location
router.delete('/:id', locationCtrl.delete);
// POST bulk import (CSV/Excel)
router.post('/bulk-import', upload.single('file'), locationCtrl.bulkImport);

module.exports = router;age });