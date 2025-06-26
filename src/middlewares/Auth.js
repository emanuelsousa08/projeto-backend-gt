const jwt = require('jsonwebtoken');

const Auth = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ mensagem: 'Token não fornecido' });
    }

    try {
        const decoded = jwt.verify(token, process.env.APP_KEY_TOKEN);
        req.userId = decoded.id;
        next();
    } catch (err) {
        res.status(403).json({ mensagem: 'Token inválido' });
    }
};

module.exports = Auth;