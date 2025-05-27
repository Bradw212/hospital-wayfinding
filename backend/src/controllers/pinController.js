const { Pin, Location, Map } = require('../models');

// Add a pin to a map, linked to a location
exports.add = async (req, res) => {
  try {
    const { x, y, mapId, locationId } = req.body;
    // Ensure location and map exist
    const loc = await Location.findByPk(locationId);
    const map = await Map.findByPk(mapId);
    if (!loc || !map) return res.status(404).json({ error: 'Location or Map not found' });
    const pin = await Pin.create({ x, y, MapId: mapId, LocationId: locationId });
    res.status(201).json(pin);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Edit pin coordinates or assignment
exports.edit = async (req, res) => {
  try {
    const { x, y, locationId } = req.body;
    const pin = await Pin.findByPk(req.params.id);
    if (!pin) return res.status(404).json({ error: 'Pin not found' });
    await pin.update({ x, y, LocationId: locationId });
    res.json(pin);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a pin
exports.delete = async (req, res) => {
  try {
    const pin = await Pin.findByPk(req.params.id);
    if (!pin) return res.status(404).json({ error: 'Pin not found' });
    await pin.destroy();
    res.json({ message: 'Pin deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};