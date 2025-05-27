require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { sequelize } = require('./models');
const locationRoutes = require('./routes/locations');
const mapRoutes = require('./routes/maps');
const pinRoutes = require('./routes/pins');
const routingRoutes = require('./routes/routing');
const issueRoutes = require('./routes/issues');
const authRoutes = require('./routes/auth');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files (uploaded maps, frontend build)
app.use('/uploads', express.static(path.join(__dirname, '../../uploads')));
app.use('/', express.static(path.join(__dirname, '../../frontend/dist')));

// API routes
app.use('/api/locations', locationRoutes);
app.use('/api/maps', mapRoutes);
app.use('/api/pins', pinRoutes);
app.use('/api/routing', routingRoutes);
app.use('/api/issues', issueRoutes);
app.use('/api/auth', authRoutes);

// Fallback for frontend SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'));
});

// Sync DB and start server
const PORT = process.env.PORT || 5000;
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
});