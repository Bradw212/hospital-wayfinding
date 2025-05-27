const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    port: process.env.DB_PORT,
    logging: false,
  }
);

// Import models
const User = require('./user')(sequelize);
const Location = require('./location')(sequelize);
const Map = require('./map')(sequelize);
const Pin = require('./pin')(sequelize);
const Issue = require('./issue')(sequelize);

// Model associations
Map.hasMany(Pin, { onDelete: 'CASCADE' });
Pin.belongsTo(Map);

Location.hasMany(Pin, { onDelete: 'CASCADE' });
Pin.belongsTo(Location);

module.exports = {
  sequelize,
  Sequelize,
  User,
  Location,
  Map,
  Pin,
  Issue,
};