/**
 * Validation middleware for food and request routes.
 * Returns 400 with a descriptive message if required fields are missing or invalid.
 */

const validateFood = (req, res, next) => {
    const { foodName, foodImage, foodQuantity, pickupLocation, expireDate, donatorInfo } = req.body;

    if (!foodName || typeof foodName !== 'string' || !foodName.trim()) {
        return res.status(400).json({ message: "foodName is required and must be a non-empty string" });
    }
    if (!foodImage || typeof foodImage !== 'string' || !foodImage.trim()) {
        return res.status(400).json({ message: "foodImage is required" });
    }
    if (foodQuantity === undefined || foodQuantity === null || isNaN(Number(foodQuantity)) || Number(foodQuantity) < 1) {
        return res.status(400).json({ message: "foodQuantity is required and must be at least 1" });
    }
    if (!pickupLocation || typeof pickupLocation !== 'string' || !pickupLocation.trim()) {
        return res.status(400).json({ message: "pickupLocation is required" });
    }
    if (!expireDate || isNaN(Date.parse(expireDate))) {
        return res.status(400).json({ message: "expireDate is required and must be a valid date" });
    }
    if (new Date(expireDate) <= new Date()) {
        return res.status(400).json({ message: "expireDate must be in the future" });
    }
    if (!donatorInfo || !donatorInfo.name || !donatorInfo.email || !donatorInfo.image) {
        return res.status(400).json({ message: "donatorInfo with name, email, and image is required" });
    }

    // Sanitize
    req.body.foodName = foodName.trim();
    req.body.pickupLocation = pickupLocation.trim();
    req.body.foodQuantity = Number(foodQuantity);

    next();
};

const validateRequest = (req, res, next) => {
    const { foodId, foodName, donatorEmail, userEmail, userName, pickupLocation, expireDate } = req.body;

    if (!foodId) {
        return res.status(400).json({ message: "foodId is required" });
    }
    if (!foodName || typeof foodName !== 'string' || !foodName.trim()) {
        return res.status(400).json({ message: "foodName is required" });
    }
    if (!donatorEmail || typeof donatorEmail !== 'string') {
        return res.status(400).json({ message: "donatorEmail is required" });
    }
    if (!userEmail || typeof userEmail !== 'string') {
        return res.status(400).json({ message: "userEmail is required" });
    }
    if (!userName || typeof userName !== 'string' || !userName.trim()) {
        return res.status(400).json({ message: "userName is required" });
    }
    if (!pickupLocation || typeof pickupLocation !== 'string' || !pickupLocation.trim()) {
        return res.status(400).json({ message: "pickupLocation is required" });
    }
    if (!expireDate || isNaN(Date.parse(expireDate))) {
        return res.status(400).json({ message: "expireDate is required and must be a valid date" });
    }

    next();
};

module.exports = { validateFood, validateRequest };
