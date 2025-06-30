require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const rateLimiter = require('./middlewares/rateLimiter');
const authMiddleware = require('./middlewares/auth');
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

// Rutas públicas (sin autenticación JWT)
app.use('/api', routes.publicRoutes);

// Rutas privadas (protegidas con JWT)
app.use('/api', authMiddleware, routes.privateRoutes);

// Fallback 404
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found in API Gateway' });
});

// Inicializar
app.listen(PORT, () => {
  logger.info(`🧩 PetConnect API Gateway running on the port ${PORT}`);
});
