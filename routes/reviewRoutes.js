const express = require('express');
const {getAllReviews,createReview,updateReview,deleteReview} = require('../controllers/reviewController');
const router = express.Router();
router.get("/allReviews", getAllReviews);
router.post("/newReview", createReview);
router.put("/updateReview/:id",updateReview);
router.delete("/deleteReview/:id", deleteReview);

module.exports = router;
