const mongoose = require('mongoose');

const RequestSchema = new mongoose.Schema({
    // Define schema fields here
});

module.exports = mongoose.model('Request', RequestSchema);
