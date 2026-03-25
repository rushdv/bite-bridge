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

app.use(cors({
    origin: (origin, callback) => {
        const allowed = (process.env.CLIENT_URL || '').split(',').map(u => u.trim());
        // Allow requests with no origin (mobile apps, curl, Postman) or matching origins
        if (!origin || allowed.includes(origin) || allowed.includes('*')) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));
app.use(express.json());

app.use('/api/foods', foodRoutes);
app.use('/api/requests', requestRoutes);

app.get('/', (req, res) => {
    res.send('BiteBridge API is running...');
});

app.use((err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode).json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});