const Food = require('../models/Food');

const addFood = async (req, res) => {
    try {
        // Ensure the donator email matches the authenticated user
        if (req.body.donatorInfo?.email !== req.user.email) {
            return res.status(403).json({ message: "Forbidden: Cannot add food on behalf of another user" });
        }
        const food = await Food.create(req.body);
        res.status(201).json(food);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getAllFoods = async (req, res) => {
    const { search, sortBy, page = 1, limit = 20 } = req.query;
    let query = { foodStatus: "Available" };

    if (search) {
        query.foodName = { $regex: search, $options: 'i' };
    }

    let sortOptions = {};
    if (sortBy === 'expireDate') sortOptions.expireDate = 1;
    else if (sortBy === 'foodQuantity') sortOptions.foodQuantity = -1;

    try {
        const skip = (parseInt(page) - 1) * parseInt(limit);
        const [foods, total] = await Promise.all([
            Food.find(query).sort(sortOptions).skip(skip).limit(parseInt(limit)),
            Food.countDocuments(query)
        ]);
        res.json({ foods, total, page: parseInt(page), totalPages: Math.ceil(total / parseInt(limit)) });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getFeaturedFoods = async (req, res) => {
    try {
        const foods = await Food.find({ foodStatus: "Available" })
            .sort({ foodQuantity: -1 })
            .limit(6);
        res.json(foods);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getFoodById = async (req, res) => {
    try {
        const food = await Food.findById(req.params.id);
        if (food) {
            res.json(food);
        } else {
            res.status(404).json({ message: "Food item not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getMyFoods = async (req, res) => {
    // Ensure users can only fetch their own foods
    if (req.params.email !== req.user.email) {
        return res.status(403).json({ message: "Forbidden: Cannot access another user's foods" });
    }
    try {
        const foods = await Food.find({ "donatorInfo.email": req.params.email });
        res.json(foods);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateFood = async (req, res) => {
    try {
        const food = await Food.findById(req.params.id);
        if (!food) {
            return res.status(404).json({ message: "Food item not found" });
        }

        // Only the original donator can update their food
        if (food.donatorInfo.email !== req.user.email) {
            return res.status(403).json({ message: "Forbidden: You can only update your own food items" });
        }

        // Prevent overwriting ownership fields
        const { donatorInfo, foodStatus, ...allowedUpdates } = req.body;
        Object.assign(food, allowedUpdates);
        const updatedFood = await food.save();
        res.json(updatedFood);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteFood = async (req, res) => {
    try {
        const food = await Food.findById(req.params.id);
        if (!food) {
            return res.status(404).json({ message: "Food item not found" });
        }

        // Only the original donator can delete their food
        if (food.donatorInfo.email !== req.user.email) {
            return res.status(403).json({ message: "Forbidden: You can only delete your own food items" });
        }

        await food.deleteOne();
        res.json({ message: "Food item removed" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { addFood, getAllFoods, getFeaturedFoods, getFoodById, getMyFoods, updateFood, deleteFood };
