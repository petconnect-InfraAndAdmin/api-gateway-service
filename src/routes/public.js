const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const rateLimiter = require('../../middleware/rateLimiter');

const services = require('../servicesConfig');

const router = express.Router();

const publicServices = [
  { prefix: '/api/v1/auth', target: services.AUTH_SERVICE }, // /register, /login, /refresh-token
  { prefix: '/api/v1/registration', target: services.REGISTRATION_SERVICE },
  { prefix: '/api/v1/search', target: services.SEARCH_SERVICE },
  { prefix: '/api/v1/email', target: services.EMAIL_SERVICE }
];

publicServices.forEach(({ prefix, target }) => {
  router.use(
    prefix,
    rateLimiter,
    createProxyMiddleware({
      target,
      changeOrigin: true,  // ← aquí faltaba la coma
      pathRewrite: {
        [`^${prefix}`]: ''   // reescribe quitando el prefijo para el microservicio
      }
    })
  );
});

module.exports = router;
