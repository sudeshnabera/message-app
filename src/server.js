const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

// Initialize app
const app = express();
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/auth', { useNewUrlParser: true, useUnifiedTopology: true });

// User Schema
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  phone: String,
  password: String
});
const User = mongoose.model('User', userSchema);

// Signup Endpoint
app.post('/api/signup', async (req, res) => {
  try {
    const { username, email, phone, password } = req.body;
    const user = new User({ username, email, phone, password });
    await user.save();
    res.status(201).send({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).send({ error: 'Failed to register user' });
  }
});

// Login Endpoint
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(401).send({ error: 'Invalid email or password' });
    }
    res.send({ message: 'Login successful', username: user.username });
  } catch (error) {
    res.status(500).send({ error: 'Failed to login' });
  }
});

// Start Server
app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});