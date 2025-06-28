const express = require('express');
const router = express.Router();
const {
    getAllReviews,
    addReview,
    deleteReview
} = require('../controllers/reviewController');

router.get('/', getAllReviews);
router.post('/', addReview);
router.delete('/:id', deleteReview);

module.exports = router;
