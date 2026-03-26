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
        if (!origin) return callback(null, true);

        const allowed = (process.env.CLIENT_URL || '*')
            .split(',')
            .map(u => u.trim().replace(/\/$/, ''));

        const normalizedOrigin = origin.replace(/\/$/, '');

        if (allowed.includes('*') || allowed.includes(normalizedOrigin)) {
            callback(null, true);
        } else {
            callback(new Error(`CORS: origin ${origin} not allowed`));
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
    res.status(500).json({ message: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;
