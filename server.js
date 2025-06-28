import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

// --- 1. CONFIGURACIÓN INICIAL ---
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// --- 2. CONEXIÓN A SUPABASE ---
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// --- 3. LÓGICA DE LAS RESEÑAS (CONTROLADORES) ---

// GET - Obtener todas las reseñas
const getReviews = async (req, res) => {
    try {
        const { data, error } = await supabase.from('reviews').select('*');
        if (error) throw error;
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// POST - Crear una nueva reseña
const createReview = async (req, res) => {
    const { title, review, rating } = req.body;
    try {
        const { data, error } = await supabase.from('reviews').insert([{ title, review, rating }]).select();
        if (error) throw error;
        res.status(201).json({ message: 'Reseña creada', review: data[0] });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// PUT - Actualizar una reseña por ID
const updateReview = async (req, res) => {
    const { id } = req.params;
    const { title, review, rating } = req.body;
    try {
        const { data, error } = await supabase.from('reviews').update({ title, review, rating }).eq('id', id).select();
        if (error) throw error;
        if (data.length === 0) return res.status(404).json({ error: 'Reseña no encontrada.' });
        res.status(200).json({ message: 'Reseña actualizada', review: data[0] });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// DELETE - Eliminar una reseña por ID
const deleteReview = async (req, res) => {
    const { id } = req.params;
    try {
        const { data, error } = await supabase.from('reviews').delete().eq('id', id).select();
        if (error) throw error;
        if (data.length === 0) return res.status(404).json({ error: 'Reseña no encontrada.' });
        res.status(200).json({ message: 'Reseña eliminada' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// --- 4. RUTAS (ENDPOINTS) ---
app.get('/api/reviews', getReviews);
app.post('/api/reviews', createReview);
app.put('/api/reviews/:id', updateReview);
app.delete('/api/reviews/:id', deleteReview);


// --- 5. INICIAR SERVIDOR ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
    console.log('Si ves este mensaje, el servidor se ha iniciado correctamente.');
    console.log('¡El error "Cannot find module" ha sido solucionado!');
});