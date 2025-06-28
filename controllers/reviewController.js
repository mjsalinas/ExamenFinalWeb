const { createClient } = require("@supabase/supabase-js");

const supabaseAnonClient = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE
);

// GET - obtener todas las reseñas
exports.getAllReviews = async (req, res) => {
    try {
        const { data, error } = await supabaseAnonClient
            .from("reviews")
            .select("*")
            .order('created_at', { ascending: false });
        if (error) throw error;
        res.status(200).json({ data });
    } catch (err) {
        res.status(err.status || 500).json({ error: err.message });
    }
    return res;
};

// POST - crear nueva reseña
exports.createReview = async (req, res) => {
    try {
        const { title, review, rating } = req.body;
        const { data, error } = await supabaseAnonClient
            .from('reviews')
            .insert({  title, review, rating })
            .select();
        if (error) throw error;
        return res.status(201).json({ data });
    } catch (err) {
        return res.status(err.status || 500).json({ error: err.message });
    }
}

// PUT - actualiza una reseña existente
exports.updateReview = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, review, rating } = req.body;

        // Añadimos .select() para que nos devuelva filas afectadas
        const { data, error } = await supabaseAnonClient
        .from("reviews")
        .update({ title, review, rating })
        .eq("id", id)
        .select();         

        if (error) throw error;
        if (!data || data.length === 0) {
        return res.status(404).json({ error: "Review no encontrado" });
        }

        return res.status(200).json({ data: data[0] });
    } catch (err) {
        console.error("Error en updateReview:", err);
        return res.status(err.status || 500).json({ error: err.message });
    }
};

// DELETE - eliminar reseña por id
exports.deleteReview = async (req, res) => {
    try {
        const { id } = req.params;
        const { error } = await supabaseAnonClient
        .from("reviews")
        .delete()
        .eq("id", id);

        if (error) throw error;
        res.status(204).send();
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};