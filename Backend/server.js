const express = require('express');
const connectDB = require('./dbconn')
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes');
const healthRoutes = require('./routes/HealthRoutes');

// Load environment variables
dotenv.config();

// Connect to Database
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/health', healthRoutes);
app.use('/api', chatRoutes);

app.get('/', (req, res) => {
    res.send("Hello from backend");
})

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log("Server running on port 4000");
})
