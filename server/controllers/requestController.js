const Request = require('../models/Request');
const Food = require('../models/Food');

const addRequest = async (req, res) => {
    try {
        // Ensure the requester email matches the authenticated user
        if (req.body.userEmail !== req.user.email) {
            return res.status(403).json({ message: "Forbidden: Cannot request food on behalf of another user" });
        }

        // Verify the food item exists and is still available
        const food = await Food.findById(req.body.foodId);
        if (!food) {
            return res.status(404).json({ message: "Food item not found" });
        }
        if (food.foodStatus !== 'Available') {
            return res.status(400).json({ message: "This food item is no longer available" });
        }

        // Prevent donator from requesting their own food
        if (food.donatorInfo.email === req.user.email) {
            return res.status(400).json({ message: "You cannot request your own food item" });
        }

        // Prevent duplicate active requests (including after rejection — one active at a time)
        const existing = await Request.findOne({
            foodId: req.body.foodId,
            userEmail: req.body.userEmail,
            requestStatus: { $in: ['Pending', 'Accepted'] }
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

const getMyRequests = async (req, res) => {
    // Ensure users can only fetch their own requests
    if (req.params.email !== req.user.email) {
        return res.status(403).json({ message: "Forbidden: Cannot access another user's requests" });
    }
    try {
        const requests = await Request.find({ userEmail: req.params.email });
        res.json(requests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getRequestsByFood = async (req, res) => {
    try {
        // Only the food's donator should see all requests for their food
        const food = await Food.findById(req.params.foodId);
        if (!food) {
            return res.status(404).json({ message: "Food item not found" });
        }
        if (food.donatorInfo.email !== req.user.email) {
            return res.status(403).json({ message: "Forbidden: Only the donator can view requests for this food" });
        }

        const requests = await Request.find({ foodId: req.params.foodId });
        res.json(requests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateRequestStatus = async (req, res) => {
    try {
        const { status } = req.body;

        if (!['Accepted', 'Rejected'].includes(status)) {
            return res.status(400).json({ message: "Invalid status. Must be 'Accepted' or 'Rejected'" });
        }

        const request = await Request.findById(req.params.id);
        if (!request) return res.status(404).json({ message: "Request not found" });

        // Only the food's donator can accept/reject requests
        if (request.donatorEmail !== req.user.email) {
            return res.status(403).json({ message: "Forbidden: Only the food donator can update request status" });
        }

        // Prevent changing status of already-processed requests
        if (request.requestStatus !== 'Pending') {
            return res.status(400).json({ message: "This request has already been processed" });
        }

        request.requestStatus = status;
        await request.save();

        if (status === 'Accepted') {
            await Food.findByIdAndUpdate(request.foodId, { foodStatus: 'Donated' });
        }

        res.json(request);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { addRequest, getMyRequests, getRequestsByFood, updateRequestStatus };
