const supabase = require('../supabaseClient');

// GET - obtener todas las reseñas
exports.getAllReviews = async (req, res) => {
  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .order('created_at', { ascending: false });

};

// POST - crear nueva reseña
exports.createReview = async (req, res) => {
  const { title, review, rating } = req.body;

  const { data, error } = await supabase
    .from('reviews')
    .insert([{ title, review, rating }])
    .select();

};

// DELETE - eliminar reseña por id
exports.deleteReview = async (req, res) => {
  const { id } = req.params;

  const { error } = await supabase
    .from('reviews')
    .delete()


};