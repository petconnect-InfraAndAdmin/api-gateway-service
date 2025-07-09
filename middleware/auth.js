module.exports = function (req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No autorizado' });
  }

  const token = authHeader.split(' ')[1];
  // Aquí puedes agregar validación real si usas JWT o similar
  if (!token) {
    return res.status(403).json({ error: 'Token inválido' });
  }

  // TODO: validar token si es necesario
  next();
};
