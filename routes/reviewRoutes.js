const express = require('express');
const router = express.Router();
const {
    getAllReviews,
    createReview,
    deleteReview
} = require('../controllers/reviewController');

router.get('/', getAllReviews);
router.post('/', createReview);
router.delete('/:id', deleteReview);

module.exports = router;
