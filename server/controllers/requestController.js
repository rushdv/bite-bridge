const Request = require('../models/Request');
const Food = require('../models/Food');

// @desc    Add a new food request
// @route   POST /api/requests
const addRequest = async (req, res) => {
    try {
        // Prevent duplicate requests from same user for same food
        const existing = await Request.findOne({
            foodId: req.body.foodId,
            userEmail: req.body.userEmail,
            requestStatus: { $ne: 'Rejected' }
        });
        if (existing) {
            return res.status(400).json({ message: "You have already requested this food item." });
        }
        const request = await Request.create(req.body);
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

// @desc    Get all requests for a specific food item (for donator)
// @route   GET /api/requests/food/:foodId
const getRequestsByFood = async (req, res) => {
    try {
        const requests = await Request.find({ foodId: req.params.foodId });
        res.json(requests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update request status (Accept / Reject)
// @route   PATCH /api/requests/:id/status
const updateRequestStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const request = await Request.findById(req.params.id);
        if (!request) return res.status(404).json({ message: "Request not found" });

        request.requestStatus = status;
        await request.save();

        // If accepted, mark the food as donated
        if (status === 'Accepted') {
            await Food.findByIdAndUpdate(request.foodId, { foodStatus: 'donated' });
        }

        res.json(request);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    addRequest,
    getMyRequests,
    getRequestsByFood,
    updateRequestStatus
};
