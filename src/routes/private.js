const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const authMiddleware = require('../../middleware/auth');

const services = require('../servicesConfig');

const router = express.Router();

const privateServices = [
  { prefix: '/api/v1/auth', target: services.AUTH_SERVICE },
  { prefix: '/api/user-profile', target: services.USER_PROFILE_SERVICE },
  { prefix: '/api/v1/roles', target: services.ROLE_SERVICE },
  { prefix: '/api/pet-profile', target: services.PET_PROFILE_SERVICE },
  { prefix: '/api/v1/pet-health', target: services.PET_HEALTH_SERVICE },
  { prefix: '/api/comments', target: services.COMMENT_SERVICE },
  { prefix: '/media', target: services.MEDIA_SERVICE },
  { prefix: '/api/v1/stories', target: services.STORY_SERVICE },
  { prefix: '/api/chat', target: services.CHAT_SERVICE },
  { prefix: '/api/notifications', target: services.NOTIFICATION_SERVICE },
  { prefix: '/api/v1/translation', target: services.TRANSLATION_SERVICE },
  { prefix: '/api/v1/audit', target: services.AUDIT_SERVICE },
  { prefix: '/reports', target: services.REPORT_SERVICE }
];

privateServices.forEach(({ prefix, target }) => {
  router.use(
    prefix,
    authMiddleware,
    createProxyMiddleware({
      target,
      changeOrigin: true,
      // Si quieres que los microservicios reciban la ruta sin el prefijo, descomenta esta línea:
      // pathRewrite: (path) => path.replace(prefix, ''),
    })
  );
});

module.exports = router;
