const express = require('express');
const router = express.Router();
const issueCtrl = require('../controllers/issueController');

// GET all issues
router.get('/', issueCtrl.getAll);
// POST report issue
router.post('/', issueCtrl.add);
// PATCH update issue status
router.patch('/:id', issueCtrl.update);

module.exports = router;