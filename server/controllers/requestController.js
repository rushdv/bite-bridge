const Request = require('../models/Request');
const Food = require('../models/Food');

// @desc    Add a new food request
// @route   POST /api/requests
const addRequest = async (req, res) => {
    try {
        const request = await Request.create(req.body);
        // We could also update the food status to "Requested" if needed, 
        // but the requirement says the owner changes it.
        res.status(201).json(request);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get requests made by a specific user
// @route   GET /api/requests/my-requests/:email
const getMyRequests = async (req, res) => {
    try {
        const requests = await Request.find({ userEmail: req.params.email });
        res.json(requests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    addRequest,
    getMyRequests
};
