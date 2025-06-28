const express = require('express');
const router = express.Router();
const {
    getAllReviews,
    updateReview,
    createReview,
    deleteReview
} = require('../controllers/reviewController');

router.get('/', getAllReviews);
router.post('/', createReview);
router.put('/:id', updateReview);  
router.delete('/:id', deleteReview);

module.exports = router;
