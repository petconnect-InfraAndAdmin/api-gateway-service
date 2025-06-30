const { createProxyMiddleware } = require('http-proxy-middleware');
const express = require('express');
const router = express.Router();

// Utilidad para simplificar la creación de proxys
const createServiceProxy = (path, target, secure = false) => {
  router.use(
    path,
    createProxyMiddleware({
      target,
      changeOrigin: true,
      pathRewrite: (path) => path.replace(path, ''), // quita el prefijo
      secure,
    })
  );
};

// === RUTAS PÚBLICAS ===
createServiceProxy('/public/auth', 'http://auth-service:3000');
createServiceProxy('/public/register', 'http://registration-service:8082');
createServiceProxy('/public/posts', 'http://post-service:3006');
createServiceProxy('/public/comments', 'http://comment-service:3007');
createServiceProxy('/public/notifications', 'http://notification-service:3005');
createServiceProxy('/public/media', 'http://media-service:3008');
createServiceProxy('/public/feed', 'http://feed-service:3010');

// === RUTAS PRIVADAS ===
createServiceProxy('/api/auth', 'http://auth-service:3000');
createServiceProxy('/api/user-profile', 'http://user-profile-service:3001');
createServiceProxy('/api/register', 'http://registration-service:8082');
createServiceProxy('/api/pet-profile', 'http://pet-profile-service:3003');
createServiceProxy('/api/pet-health', 'http://pet-health-service:3011'); // Ruby
createServiceProxy('/api/chat', 'http://chat-service:3004');
createServiceProxy('/api/notifications', 'http://notification-service:3005');
createServiceProxy('/api/posts', 'http://post-service:3006');
createServiceProxy('/api/comments', 'http://comment-service:3007');
createServiceProxy('/api/media', 'http://media-service:3008');
createServiceProxy('/api/feed', 'http://feed-service:3010');
createServiceProxy('/api/reports', 'http://report-service:3012');

module.exports = {
  publicRoutes: router,
  privateRoutes: router,
};
