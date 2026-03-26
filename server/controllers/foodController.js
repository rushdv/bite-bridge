const Food = require('../models/Food');

const addFood = async (req, res) => {
    try {
        const food = await Food.create(req.body);
        res.status(201).json(food);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getAllFoods = async (req, res) => {
    const { search, sortBy } = req.query;
    let query = { foodStatus: "Available" };

    if (search) {
        query.foodName = { $regex: search, $options: 'i' };
    }

    let sortOptions = {};
    if (sortBy === 'expireDate') sortOptions.expireDate = 1;
    else if (sortBy === 'foodQuantity') sortOptions.foodQuantity = -1;

    try {
        const foods = await Food.find(query).sort(sortOptions);
        res.json(foods);
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
        if (food) {
            Object.assign(food, req.body);
            const updatedFood = await food.save();
            res.json(updatedFood);
        } else {
            res.status(404).json({ message: "Food item not found" });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteFood = async (req, res) => {
    try {
        const food = await Food.findById(req.params.id);
        if (food) {
            await food.deleteOne();
            res.json({ message: "Food item removed" });
        } else {
            res.status(404).json({ message: "Food item not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { addFood, getAllFoods, getFeaturedFoods, getFoodById, getMyFoods, updateFood, deleteFood };
