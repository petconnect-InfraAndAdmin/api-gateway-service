const { createProxyMiddleware } = require('http-proxy-middleware');
const express = require('express');

const publicRouter = express.Router();
const privateRouter = express.Router();

/**
 * Función para crear un proxy hacia un microservicio
 * @param {Router} router - Router de Express (público o privado)
 * @param {string} path - Ruta base en el API Gateway
 * @param {string} target - URL interna del microservicio
 * @param {boolean} secure - Si se deben validar certificados HTTPS (false para entorno dev)
 */
const createServiceProxy = (router, path, target, secure = false) => {
  router.use(
    path,
    createProxyMiddleware({
      target,
      changeOrigin: true,
      secure,
      pathRewrite: { [`^${path}`]: '' },
    })
  );
};

// ===============================
// === RUTAS PÚBLICAS (sin JWT) ===
// ===============================
createServiceProxy(publicRouter, '/api/v1/auth', 'http://auth-service:3000'); // incluye /register y /login
createServiceProxy(publicRouter, '/api/v1/comments', 'http://comment-service:3007');
createServiceProxy(publicRouter, '/api/v1/feed', 'http://feed-service:3010');
createServiceProxy(publicRouter, '/api/v1/media', 'http://media-service:3008');
createServiceProxy(publicRouter, '/api/v1/notifications', 'http://notification-service:3005');
createServiceProxy(publicRouter, '/api/v1/posts', 'http://post-service:3006');

// ===============================
// === RUTAS PRIVADAS (requieren JWT) ===
// ===============================
createServiceProxy(privateRouter, '/api/v1/chat', 'http://chat-service:3004');
createServiceProxy(privateRouter, '/api/v1/comments', 'http://comment-service:3007');
createServiceProxy(privateRouter, '/api/v1/feed', 'http://feed-service:3010');
createServiceProxy(privateRouter, '/api/v1/media', 'http://media-service:3008');
createServiceProxy(privateRouter, '/api/v1/notifications', 'http://notification-service:3005');
createServiceProxy(privateRouter, '/api/v1/pet-health', 'http://pet-health-service:3011');
createServiceProxy(privateRouter, '/api/v1/pet-profile', 'http://pet-profile-service:3003');
createServiceProxy(privateRouter, '/api/v1/posts', 'http://post-service:3006');
createServiceProxy(privateRouter, '/api/v1/reports', 'http://report-service:3012');
createServiceProxy(privateRouter, '/api/v1/user-profile', 'http://user-profile-service:3001');

module.exports = {
  publicRoutes: publicRouter,
  privateRoutes: privateRouter,
};
