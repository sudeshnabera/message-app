const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./config/db');
const authRoutes = require('./routes/auth');

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());  // For parsing application/json

// Routes
app.use('/api/auth', authRoutes); // Register the routes

// Test DB connection and sync
sequelize.authenticate()
  .then(() => {
    console.log('PostgreSQL Connected');
    return sequelize.sync({ alter: true });
  })
  .then(() => {
    console.log('Tables synced');
  })
  .catch(err => console.log('DB Connection Error:', err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
