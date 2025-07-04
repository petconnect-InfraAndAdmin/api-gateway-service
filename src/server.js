require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const rateLimiter = require('./middleware/rateLimiter');
const authMiddleware = require('./middleware/auth');
const routes = require('./routes');
const logger = require('./utils/logger');

const app = express();
const PORT = process.env.PORT_GATEWAY || 4000;

// Middleware global
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use(morgan('dev'));
app.use(rateLimiter);

// ✅ Rutas públicas (no requieren token)
app.use('/api/v1', routes.publicRoutes);

// ✅ Rutas privadas (requieren token JWT)
app.use('/api/v1', authMiddleware, routes.privateRoutes);

// Fallback 404 para rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found in API Gateway' });
});

// Inicialización del servidor
app.listen(PORT, () => {
  logger.info(`🧩 PetConnect API Gateway running on port ${PORT}`);
});
