const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const StudentModel = require('./models/StudentSchema');

const app = express();

// Middleware setup
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb+srv://navaneethkp100:mongo12345@cluster0.2ttedel.mongodb.net/login?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB Connection Succeeded.');
}).catch(err => {
  console.error('Error in DB connection : ' + err);
});

// Register endpoint
app.post("/register", async (req, res) => {
  try {
    const user = await StudentModel.create({
      email: req.body.email,
      password: req.body.password
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to register user" });
  }
});

// Login endpoint
app.post("/login", async (req, res) => {
  try {
    const user = await StudentModel.findOne({ email: req.body.email });
    if (user) {
      const passwordMatch = req.body.password === user.password;
      if (passwordMatch) {
        res.status(200).json({ message: "Login successful" });
      } else {
        res.status(400).json({ error: "Password incorrect" });
      }
    } else {
      res.status(400).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
});

// Start the server
const PORT = process.env.PORT || 3009;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
