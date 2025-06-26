const User = require('../models/User');


module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // validação básica do token (fictícia ou simplificada)
  if (!authHeader || authHeader !== '123456') {
    return res.status(401).json({ message: 'Token inválido ou ausente' });
  }

  next();
};
