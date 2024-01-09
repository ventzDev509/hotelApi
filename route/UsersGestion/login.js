const { user } = require('../../db/sequelize');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const key = require('./privatekeys');
const Loginvalidation = require('../../validationDatas/userValidation');

module.exports = (app) => {
    app.post('/api/user/login', (req, res) => {
        const { error } = Loginvalidation(req.body).LoginValidation;
        if (error) return res.status(500).json(error.details[0].message);

        user.findOne({ where: { email: req.body.email } })
            .then(userResponse => {
                if (!userResponse) {
                    res.json({ msg: "Email incorrect" });
                } else {
                    bcrypt.compare(req.body.password, userResponse.password)
                        .then(passwordMatch => {
                            if (!passwordMatch) return res.json({ msg: "Mot de passe incorrect" });

                            // Utilisation userResponse.email pour inclure l'email dans le JWT
                            res.status(200).json({
                                msg: "Login réussi",
                                token: jwt.sign({ email: userResponse.email }, key, { expiresIn: "24h" })
                            });
                        })
                        .catch(error => res.status(500).json(error));
                }
            })
            .catch(error => res.status(500).json(error));
    });
};
