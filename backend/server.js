const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// Create app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://kiransahu2909:7f1cbmk4FrYDwaCs@cluster0.chpph9a.mongodb.net/policypal?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Define Schema & Model for form data
const quoteSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  category: String,
  premiumTerm: String,
  sumAssured: String,
  submittedAt: { type: Date, default: Date.now }
});

const Quote = mongoose.model('Quote', quoteSchema);

// API to receive form submissions
app.post('/api/quotes', async (req, res) => {
  try {
    const { name, phone, email, category, premiumTerm, sumAssured } = req.body;

    // Basic validation
    if (!name || !phone || !email || !category || !premiumTerm || !sumAssured) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Save to database
    const newQuote = new Quote({
      name,
      phone,
      email,
      category,
      premiumTerm,
      sumAssured,
    });

    await newQuote.save();

    res.status(201).json({ message: "Quote request received successfully! We'll get back to you soon with a custom quote" });
  } catch (error) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));





const consultationSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  preferredTime: String,
  helpType: String,
  message: String,
  submittedAt: { type: Date, default: Date.now }
});

const Consultation = mongoose.model('Consultation', consultationSchema);

app.post('/api/consultation', async (req, res) => {
  try {
    const { name, phone, email, preferredTime, helpType, message } = req.body;

    if (!name || !phone || !preferredTime || !helpType) {
      return res.status(400).json({ message: 'Required fields missing.' });
    }

    const newConsult = new Consultation({
      name,
      phone,
      email,
      preferredTime,
      helpType,
      message,
    });

    await newConsult.save();

    res.status(201).json({ message: 'Consultation request received successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Server error.' });
  }
});
