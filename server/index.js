const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = 5000;

// Import routes
const addressRoutes = require('./routes/addressRoutes');

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/addresses', addressRoutes);

// ✅ MongoDB connection with database name specified
mongoose.connect('mongodb+srv://Aslam_Musbar:musbar123@aslamcluster.zxsvx2o.mongodb.net/addressManager?retryWrites=true&w=majority&appName=aslamCluster', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000,
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unexpected error occurred:', err);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
