const express = require('express');
const { PORT } = require('./config');
const privateRoutes = require('./routes/private');
const publicRoutes = require('./routes/public');
const rateLimiter = require('../../middleware/rateLimiter'); // Ajusté la ruta porque debe ser relativa a src
const logger = require('./utils/logger'); // Igual aquí

const app = express();

// Middleware global: limitador de solicitudes para evitar abusos (ideal mantenerlo aquí)
app.use(rateLimiter);

// Rutas públicas (antes de las protegidas)
app.use(publicRoutes);

// Rutas protegidas (requieren auth)
app.use(privateRoutes);

// Manejo de errores general
app.use((err, req, res, next) => {
  logger.error(err.message);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Escuchar el puerto
app.listen(PORT, () => {
  console.log(`API Gateway corriendo en puerto ${PORT}`);
});
