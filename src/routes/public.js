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
      changeOrigin: true
      // pathRewrite: (path) => path.replace(prefix, '') // solo si tu microservicio no usa prefijo
    })
  );
});

module.exports = router;

module.exports = router;
