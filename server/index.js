const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const initializeFirebase = require('./config/firebase');
const foodRoutes = require('./routes/foodRoutes');
const requestRoutes = require('./routes/requestRoutes');

dotenv.config();
connectDB();
initializeFirebase();

const app = express();

// CORS
app.use(cors({
    origin: (origin, callback) => {
        const allowed = (process.env.CLIENT_URL || '')
            .split(',')
            .map(u => u.trim());

        if (!origin || allowed.includes(origin) || allowed.includes('*')) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

app.use(express.json());

// Routes
app.use('/api/foods', foodRoutes);
app.use('/api/requests', requestRoutes);

// Root route
app.get('/', (req, res) => {
    res.send('BiteBridge API is running...');
});

// Error handler
app.use((err, req, res, next) => {
    res.status(500).json({
        message: err.message
    });
});


module.exports = app;

if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}