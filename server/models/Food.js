const mongoose = require('mongoose');

const FoodSchema = new mongoose.Schema({
    // Define schema fields here
});

module.exports = mongoose.model('Food', FoodSchema);
