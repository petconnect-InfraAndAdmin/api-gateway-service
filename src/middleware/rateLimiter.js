// src/middlewares/rateLimiter.js
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minuto
  max: 100, // Límite de 100 peticiones por IP por minuto
  standardHeaders: true, // Devuelve headers estándar de rate limit
  legacyHeaders: false, // Desactiva headers legacy (X-RateLimit-*)
  message: 'Too many requests, please try again later.',
});

module.exports = limiter;
