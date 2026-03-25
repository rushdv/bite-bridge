const express = require('express');
const router = express.Router();
const { addRequest, getMyRequests } = require('../controllers/requestController');

router.post('/', addRequest);
router.get('/my-requests/:email', getMyRequests);

module.exports = router;
