const { Location, Pin } = require('../models');
const { parse } = require('csv-parse');
const fs = require('fs');
const path = require('path');
const QRCode = require('qrcode');

// Get all locations
exports.getAll = async (req, res) => {
  const locations = await Location.findAll({ include: [Pin] });
  res.json(locations);
};

// Add a new location
exports.add = async (req, res) => {
  try {
    const { name, floor, zone, category } = req.body;
    // Generate QR code text (can be location ID or something more robust)
    const qrString = `hospital-location:${name.replace(/ /g,'_')}`;
    const qrCodePath = path.join('uploads', 'qrcodes', `${name.replace(/ /g,'_')}.png`);
    await QRCode.toFile(qrCodePath, qrString);
    const location = await Location.create({ name, floor, zone, category, qrCode: qrCodePath });
    res.status(201).json(location);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Edit a location
exports.edit = async (req, res) => {
  try {
    const { name, floor, zone, category } = req.body;
    const location = await Location.findByPk(req.params.id);
    if (!location) return res.status(404).json({ error: 'Location not found' });
    await location.update({ name, floor, zone, category });
    res.json(location);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a location and its pins
exports.delete = async (req, res) => {
  try {
    const location = await Location.findByPk(req.params.id);
    if (!location) return res.status(404).json({ error: 'Location not found' });
    await Pin.destroy({ where: { LocationId: location.id } });
    await location.destroy();
    res.json({ message: 'Location and its pins deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Bulk import from CSV (expects 'file' field upload)
exports.bulkImport = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    const locations = [];
    fs.createReadStream(req.file.path)
      .pipe(parse({ columns: true, trim: true }))
      .on('data', row => locations.push(row))
      .on('end', async () => {
        for (const row of locations) {
          await Location.create({
            name: row.name,
            floor: row.floor,
            zone: row.zone,
            category: row.category,
            qrCode: '' // could generate QR codes in bulk if needed
          });
        }
        res.json({ message: 'Bulk import successful', count: locations.length });
      });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};