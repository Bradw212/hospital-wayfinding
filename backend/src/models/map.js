const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Map = sequelize.define('Map', {
    floor: { type: DataTypes.INTEGER, allowNull: false },
    filePath: { type: DataTypes.STRING, allowNull: false }, // PNG/PDF path
    walkableGrid: { type: DataTypes.JSONB }, // Grid or pixel-precision walkable area
  });

  return Map;
};