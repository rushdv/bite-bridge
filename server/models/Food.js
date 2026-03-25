const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
    foodName: { type: String, required: true },
    foodImage: { type: String, required: true },
    foodQuantity: { type: Number, required: true },
    pickupLocation: { type: String, required: true },
    expireDate: { type: Date, required: true },
    additionalNotes: { type: String },
    donatorInfo: {
        name: { type: String, required: true },
        email: { type: String, required: true },
        image: { type: String, required: true }
    },
    foodStatus: { type: String, default: "Available", enum: ["Available", "Requested"] }
}, {
    timestamps: true
});

module.exports = mongoose.model('Food', foodSchema);
