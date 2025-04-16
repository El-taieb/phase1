const express = require('express');
const router = express.Router();
const { createReview, getProductReviews } = require('../controllers/reviewController');

// POST /api/reviews
router.post('/', createReview);

// GET /api/reviews/:productId
router.get('/:productId', getProductReviews);

module.exports = router;
