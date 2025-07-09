const rateLimit = require('express-rate-limit');

module.exports = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minuto
  max: 100, // máximo 100 peticiones por minuto por IP
  standardHeaders: true,
  legacyHeaders: false
});
