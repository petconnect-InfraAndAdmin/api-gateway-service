const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const rateLimiter = require('../middleware/rateLimiter'); // Opcional, si tienes un limitador de velocidad
const services = require('../servicesConfig');

const router = express.Router();

// Define solo los servicios o endpoints que serán públicos, sin authMiddleware
const publicServices = [
  { prefix: '/api/v1/auth', target: services.AUTH_SERVICE },  // Por ejemplo, registro y login son públicos
  { prefix: '/api/v1/registration', target: services.REGISTRATION_SERVICE }, // Ajusta según tus rutas
  { prefix: '/api/v1/search', target: services.SEARCH_SERVICE },
  { prefix: '/api/v1/email', target: services.EMAIL_SERVICE },
  // agrega más aquí según sea necesario
];

publicServices.forEach(({ prefix, target }) => {
  router.use(
    prefix,
    rateLimiter,  // O remuévelo si no quieres limitador para públicos
    createProxyMiddleware({
      target,
      changeOrigin: true,
      // pathRewrite: (path) => path.replace(prefix, ''), // Si quieres limpiar la ruta para el microservicio
    })
  );
});

module.exports = router;
