const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
    foodId: { type: mongoose.Schema.Types.ObjectId, ref: 'Food', required: true },
    foodName: { type: String, required: true },
    foodImage: { type: String, required: true },
    donatorEmail: { type: String, required: true },
    donatorName: { type: String, required: true },
    userEmail: { type: String, required: true },
    userName: { type: String, required: true },
    requestDate: { type: Date, default: Date.now },
    pickupLocation: { type: String, required: true },
    expireDate: { type: Date, required: true },
    additionalNotes: { type: String },
    requestStatus: { type: String, default: "Pending", enum: ["Pending", "Accepted", "Rejected"] }
}, {
    timestamps: true
});

module.exports = mongoose.model('Request', requestSchema);
