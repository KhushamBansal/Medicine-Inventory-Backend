require('dotenv').config();
const redis = require("redis"); 
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const app = express();

// Middleware
app.use(express.json()); // Use express.json() instead of bodyParser.json()

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/medicine-db');


// Connect to Redis
const redisClient = redis.createClient({
    url: 'redis://127.0.0.1:6379' // Simplified connection string format
});

(async () => {
    try {
        await redisClient.connect();
        console.log("Connecting to Redis");
    } catch (err) {
        console.error("Error connecting to Redis:", err);
    }
})();

redisClient.on("ready", () => {
    console.log("Connected!");
});

redisClient.on("error", (err) => {
    console.error("Error in the connection:", err);
});

// Make Redis client available to routes
app.use((req, res, next) => {
    req.redisClient = redisClient;
    next();
});


// Routes
app.use('/api/medicines', routes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


