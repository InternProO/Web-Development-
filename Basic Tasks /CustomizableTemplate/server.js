const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost/template-generator', { useNewUrlParser: true, useUnifiedTopology: true });

// Define Template Schema
const templateSchema = new mongoose.Schema({
  name: String,
  title: String,
  content: String
});

const Template = mongoose.model('Template', templateSchema);

// API Endpoints
app.get('/api/templates', async (req, res) => {
  try {
    const templates = await Template.find();
    res.json(templates);
  } catch (error) {
    res.status(500).send('Error fetching templates');
  }
});

// Start Server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
