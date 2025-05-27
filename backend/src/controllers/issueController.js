const { Issue } = require('../models');

// Get all issues
exports.getAll = async (req, res) => {
  const issues = await Issue.findAll();
  res.json(issues);
};

// Report a new issue
exports.add = async (req, res) => {
  try {
    const { title, description, locationId, pinId, type } = req.body;
    const issue = await Issue.create({ title, description, locationId, pinId, type });
    res.status(201).json(issue);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update issue status
exports.update = async (req, res) => {
  try {
    const { status } = req.body;
    const issue = await Issue.findByPk(req.params.id);
    if (!issue) return res.status(404).json({ error: 'Issue not found' });
    await issue.update({ status });
    res.json(issue);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};