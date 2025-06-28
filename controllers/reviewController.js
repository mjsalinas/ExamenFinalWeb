const { createClient } = require("@supabase/supabase-js");

const supabaseAnonClient = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

exports.getAllReviews = async (req, res) => {
  try {
    const { data, error } = await supabaseAnonClient
      .from("reviews")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    res.status(200).json({ data });
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
  return res;
};

exports.createReview = async (req, res) => {
  try {
    const { title, review, rating } = req.body;

    if (!title) {
      return res.status(400).json({ error: "El título es obligatorio" });
    }

    const { data, error } = await supabaseAnonClient
      .from("reviews")
      .insert([{ title, review, rating }])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json({ data });
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
  return res;
};

exports.updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, review, rating } = req.body;

    const { data, error } = await supabaseAnonClient
      .from("reviews")
      .update({ title, review, rating })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    if (!data) return res.status(404).json({ error: "Reseña no encontrada" });

    res.status(200).json({ data });
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
  return res;
};

exports.deleteReview = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabaseAnonClient
      .from("reviews")
      .delete()
      .eq("id", id);

    if (error) throw error;

    res.status(204).send(); // No content
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
  return res;
};

