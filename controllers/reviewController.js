const supabase = require('../services/supabaseClient');

const getAllReviews = async (req, res) => {
  try {
    const { data, error } = await supabase.from('reviews').select('*');
    if (error) {
      console.error('Error de Supabase en getAllReviews:', error);
      throw new Error(`Error de Supabase: ${error.message}`);
    }
    res.status(200).json(data || []);
  } catch (err) {
    console.error('Error fetching reviews:', err.message);
    res.status(500).json({ error: 'Error al obtener las reseñas', details: err.message });
  }
};

const addReview = async (req, res) => {
  try {
    console.log('Cuerpo recibido en addReview:', req.body); // Depuración
    const { title, review, rating } = req.body || {};
    
    // Validaciones
    if (!title || rating === undefined) {
      return res.status(400).json({ error: 'Los campos "title" y "rating" son obligatorios' });
    }
    if (typeof rating !== 'number' || rating < 0 || rating > 5) {
      return res.status(400).json({ error: 'El "rating" debe ser un número entre 0 y 5' });
    }

    const { data, error } = await supabase
      .from('reviews')
      .insert([{ title: title.trim(), review: review ? review.trim() : null, rating }])
      .select(); // Agregamos .select() para obtener los datos insertados
    if (error) {
      console.error('Error de Supabase en addReview:', error);
      throw new Error(`Error de Supabase: ${error.message}`);
    }

    console.log('Datos insertados:', data);
    res.status(201).json(data[0] || {});
  } catch (err) {
    console.error('Error adding review:', err.message);
    res.status(500).json({ error: 'Error al agregar la reseña', details: err.message });
  }
};

const updateReview = async (req, res) => {
  try {
    console.log('Cuerpo recibido en updateReview:', req.body); // Depuración
    const { id } = req.params;
    const { title, review, rating } = req.body || {};

    // Validaciones
    if (!title && !review && rating === undefined) {
      return res.status(400).json({ error: 'Debe proporcionar al menos un campo para actualizar (title, review, rating)' });
    }
    if (rating !== undefined && (typeof rating !== 'number' || rating < 0 || rating > 5)) {
      return res.status(400).json({ error: 'El "rating" debe ser un número entre 0 y 5' });
    }

    const updateData = {
      ...(title && { title: title.trim() }),
      ...(review !== undefined && { review: review ? review.trim() : null }),
      ...(rating !== undefined && { rating }),
    };

    const { data, error } = await supabase
      .from('reviews')
      .update(updateData)
      .eq('id', id)
      .select();
    if (error) {
      console.error('Error de Supabase en updateReview:', error);
      throw new Error(`Error de Supabase: ${error.message}`);
    }
    if (!data || data.length === 0) {
      return res.status(404).json({ error: 'Reseña no encontrada' });
    }

    console.log('Datos actualizados:', data);
    res.status(200).json(data[0]);
  } catch (err) {
    console.error('Error updating review:', err.message);
    res.status(500).json({ error: 'Error al actualizar la reseña', details: err.message });
  }
};

const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: 'El ID es obligatorio' });
    }

    // Validación básica del formato UUID (patrón 8-4-4-4-12)
    const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
    if (!uuidRegex.test(id)) {
      return res.status(400).json({ error: 'El ID proporcionado no es un UUID válido' });
    }

    const { data, error } = await supabase
      .from('reviews')
      .delete()
      .eq('id', id)
      .select();
    if (error) {
      console.error('Error de Supabase en deleteReview:', error);
      throw new Error(`Error de Supabase: ${error.message}`);
    }
    if (!data || data.length === 0) {
      return res.status(404).json({ error: 'Reseña no encontrada' });
    }

    res.status(200).json({ message: 'Reseña eliminada' });
  } catch (err) {
    console.error('Error deleting review:', err.message);
    res.status(500).json({ error: 'Error al eliminar la reseña', details: err.message });
  }
};

module.exports = {
  getAllReviews,
  addReview,
  updateReview,
  deleteReview,
};