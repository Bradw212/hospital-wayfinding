const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Issue = sequelize.define('Issue', {
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    status: { type: DataTypes.STRING, defaultValue: 'open' }, // open, resolved, etc.
    locationId: { type: DataTypes.INTEGER },
    pinId: { type: DataTypes.INTEGER },
    type: { type: DataTypes.STRING }, // 'blocked_path', 'maintenance', etc.
  });

  return Issue;
};