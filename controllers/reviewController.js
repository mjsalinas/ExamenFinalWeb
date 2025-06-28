const supabase = require('../services/supabaseClient');

// GET - obtener todas las reseñas
exports.getAllReviews = async (req, res) => {
  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
};

// POST - crear nueva reseña
exports.createReview = async (req, res) => {
  const { title, review, rating } = req.body;

  const { data, error } = await supabase
    .from('reviews')
    .insert([{ title, review, rating }])
    .select();

  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data[0]);
};

// PUT - actualizar reseña existente
exports.updateReview = async (req, res) => {
  const { id } = req.params;
  const { title, review, rating } = req.body;

  const { data, error } = await supabase
    .from('reviews')
    .update({ title, review, rating })
    .eq('id', id)
    .select();

  if (error) return res.status(500).json({ error: error.message });
  res.json(data[0]);
};

// DELETE - eliminar reseña por id
exports.deleteReview = async (req, res) => {
  const { id } = req.params;

  const { error } = await supabase
    .from('reviews')
    .delete()
    .eq('id', id);

  if (error) return res.status(500).json({ error: error.message });
  res.status(204).send();
};
