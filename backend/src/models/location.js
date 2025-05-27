const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Location = sequelize.define('Location', {
    name: { type: DataTypes.STRING, allowNull: false },
    floor: { type: DataTypes.INTEGER, allowNull: false },
    zone: { type: DataTypes.STRING },
    category: { type: DataTypes.STRING },
    qrCode: { type: DataTypes.STRING }, // Stores QR code text or path
  });

  return Location;
};