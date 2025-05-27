const { Map, Pin } = require('../models');
const path = require('path');

// Get all maps
exports.getAll = async (req, res) => {
  const maps = await Map.findAll({ include: [Pin] });
  res.json(maps);
};

// Upload new map (expects 'file' field upload)
exports.upload = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    const { floor } = req.body;
    const newMap = await Map.create({
      floor,
      filePath: req.file.path,
      walkableGrid: null
    });
    res.status(201).json(newMap);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Edit map (walkable grid, etc)
exports.edit = async (req, res) => {
  try {
    const { walkableGrid } = req.body;
    const map = await Map.findByPk(req.params.id);
    if (!map) return res.status(404).json({ error: 'Map not found' });
    await map.update({ walkableGrid });
    res.json(map);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete map and its pins
exports.delete = async (req, res) => {
  try {
    const map = await Map.findByPk(req.params.id);
    if (!map) return res.status(404).json({ error: 'Map not found' });
    await Pin.destroy({ where: { MapId: map.id } });
    await map.destroy();
    res.json({ message: 'Map and its pins deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};