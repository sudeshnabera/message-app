const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./config/db');
const authRoutes = require('./routes/auth');
const Message = require('./models/message');
const messageRoutes = require('./routes/message');
const getProfileData = require('./routes/user');
const friendRoutes  = require('./routes/friendRequest');
const getUserList = require('./routes/userList');
dotenv.config();
const app = express();


// Middleware
app.use(cors());
app.use(express.json());  // For parsing application/json

// Routes
app.use('/api/auth', authRoutes); // Register the routes
app.use('/api/messages', messageRoutes);
app.use('/api/user', getProfileData);
app.use('/api/friend', friendRoutes );
app.use('/api/all_user', getUserList);

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
