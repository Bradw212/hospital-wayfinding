const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Pin = sequelize.define('Pin', {
    x: { type: DataTypes.FLOAT, allowNull: false },
    y: { type: DataTypes.FLOAT, allowNull: false },
  });

  return Pin;
};