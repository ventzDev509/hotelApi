const jwt = require('jsonwebtoken');
const key = require('./privatekeys');

module.exports = (req, res, next) => {
    const authorization = req.headers.authorization;

    if (!authorization) {
        const msg = "Vous n'avez pas fourni de jeton";
        return res.status(401).json({ msg });
    }

    const token = authorization.split(' ')[1];

    try {
        const decodedToken = jwt.verify(token, key);

        const usermail = decodedToken.email;

        if (req.body.email && req.body.email !== usermail) {
            const msg = "Identifiant invalide";
            return res.status(401).json({ msg });
        }

        req.userEmail = usermail;
        next();
    } catch (error) {
        const msg = "Vous devriez vous connecter";
        res.status(401).json({ msg, data: error });
    }
};
