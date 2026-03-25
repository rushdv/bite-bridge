const express = require('express');
const router = express.Router();
const { addRequest, getMyRequests, getRequestsByFood, updateRequestStatus } = require('../controllers/requestController');
const verifyToken = require('../middleware/verifyToken');

router.post('/', verifyToken, addRequest);
router.get('/my-requests/:email', verifyToken, getMyRequests);
router.get('/food/:foodId', verifyToken, getRequestsByFood);
router.patch('/:id/status', verifyToken, updateRequestStatus);

module.exports = router;
