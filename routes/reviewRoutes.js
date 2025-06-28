const express = require('express');
const router = express.Router();

const {
  getAllReviews,
  addReview,
  updateReview,
  deleteReview,
} = require('../controllers/reviewController');

// Ruta para obtener todas las reseñas
router.get('/', getAllReviews);

// Ruta para agregar una nueva reseña
router.post('/', addReview);

// Ruta para actualizar una reseña por ID
router.put('/:id', updateReview);

// Ruta para eliminar una reseña por ID
router.delete('/:id', deleteReview);

module.exports = router;