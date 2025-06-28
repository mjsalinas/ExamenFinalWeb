require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();
const reviewRoutes = require('./routes/reviewRoutes');

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use('/reviews', reviewRoutes);

// Manejo de errores global
app.use((err, req, res, next) => {
    console.error('Error inesperado:', err.stack);
    res.status(500).json({ error: 'Error interno del servidor', details: err.message });
});

// Configuración del puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT} a las ${new Date().toLocaleString('es-MX', { timeZone: 'America/Mexico_City' })}`);
});