//appel de l'instance user du modele user
const { user } = require('../../db/sequelize')
const bcrypt = require('bcrypt')
const validation = require('../../validationDatas/userValidation')
module.exports = (app) => {
    app.post('/api/user/new', (req, res) => {
        //validation des donnees recevoir
        const { error } = validation(req.body).RegisterValidation
        //retourner un message d'erreur si les donnees ne sont pas correct
        if (error) return res.status(500).json({ msg: error.details[0].message })

        //verification email exite dans la BDD
        const email = req.body.email
        user.findOne({ where: { email: email } })
            //response de la requette
            .then(response => {
                //email n'existe pas dans la bdd
                if (response == null) {

                    // hasher le mode de passe en utilisant le module bcrypt
                    bcrypt.hash(req.body.password, 10)
                        .then(hashmdb => {
                            // retourner un message d'erreur si le hash contient des erreur
                            if (!hashmdb) return res.status(500).json({ msg: "une erreur est survenir reesayer plustard" })
                            //si non on
                            // effacer le mode passe de utilisateur dans le body de la req
                            delete req.body.password
                            const data = {
                                "fullName": req.body.fullName,
                                "email": req.body.email,
                            }
                            // creation de l'utilisateur avec les nouvelles donnees
                            user.create({
                                ...data, password: hashmdb
                            }
                            )
                                //insertion success retourne un message au format json
                                .then(User => {
                                    const msg = "Compte ajouter avec success"
                                    res.status(200).json({ msg })
                                })
                                // sinon on a une erreur et on retourne l'erreur
                                .catch(error => res.status(500).json(error))
                        })

                } else {
                    // email existe on envoir un message json
                    res.status(200).json({ msg: "cette email est deja utiliser" })
                }
            })
            //erreur du server
            .catch(error => res.status(500).json(error))
    })
}