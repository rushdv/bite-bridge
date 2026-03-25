const express = require('express');
const router = express.Router();
const {
    addFood,
    getAllFoods,
    getFeaturedFoods,
    getFoodById,
    getMyFoods,
    updateFood,
    deleteFood
} = require('../controllers/foodController');

router.post('/', addFood);
router.get('/', getAllFoods);
router.get('/featured', getFeaturedFoods);
router.get('/:id', getFoodById);
router.get('/my-foods/:email', getMyFoods);
router.put('/:id', updateFood);
router.delete('/:id', deleteFood);

module.exports = router;
