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
const { validateFood } = require('../middleware/validation');

router.post('/', verifyToken, validateFood, addFood);
router.get('/', getAllFoods);
// CRITICAL: /featured must come BEFORE /:id to prevent "featured" being treated as an ID
router.get('/featured', getFeaturedFoods);
router.get('/my-foods/:email', verifyToken, getMyFoods);
router.get('/:id', getFoodById);
router.put('/:id', verifyToken, validateFood, updateFood);
router.delete('/:id', verifyToken, deleteFood);

module.exports = router;
