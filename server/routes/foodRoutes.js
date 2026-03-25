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
const verifyToken = require('../middleware/verifyToken');

router.post('/', verifyToken, addFood);
router.get('/', getAllFoods);
router.get('/featured', getFeaturedFoods);
router.get('/my-foods/:email', verifyToken, getMyFoods);
router.get('/:id', getFoodById);
router.put('/:id', verifyToken, updateFood);
router.delete('/:id', verifyToken, deleteFood);

module.exports = router;
