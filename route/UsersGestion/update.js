// appel de instance de la modele user de la table user
const { user } = require("../../db/sequelize");
const validation = require("../../validationDatas/userValidation");
const isAuth=require('../UsersGestion/isAuth')
require('../../middlewares/isAuth')

// creation d'une function  avec le point de terminaison  {/api/user/update/:id}
module.exports = (app) => {
  // app.use(passport.authenticate("jwt", { session: false }))
  app.post("/api/user/update/",isAuth, (req, res) => {
    // recuperation de la variable id passer en paramette du point de terminaison
    const email = req.user.email
    // validation des donnees recevoir avec la function {validation}
    const dataV={
     "fullName":req.body.fullName,
     "telephone":req.body.telephone,
     "address":req.body.address,
     "dateOfBirth":req.body.dateOfBirth
    }
    const { error } = validation(dataV).updateValidation
    // si les donnees ne sont pas valide retour d'un message json avec l'erreur
    if (error) return res.status(401).json({ msg: error.details[0].message })
    //verification si l'utilisateur se trouve dans la base de donnees avant de la modifier
    user.findOne({ where: { email: email } })
      .then(response => {
        if (response != null) {
          // a user find 
          const dta = {
            "fullName": req.body.fullName,
            "address": req.body.address,
            "city": req.body.city,
            "country": req.body.country,
            "telephone": req.body.telephone,
            "dateOfBirth": req.body.dateOfBirth,
            "profile": req.body.profile,
          }
          // update user
          user
            .update(dta, { where: { email: email } })
            .then(
              _ => { 
                user.findOne({ where: { email: email } })
                  .then(User => {
                    const msg = "Modifier Avec Success"
                    res.status(200).json({ msg })
                  })
              }
            )
            .catch(error => res.status(500).json(error))
        } else {
          //user not found
          res.status(404).json({ msg: `Aucun compte n'a ete trouver ` })
        }
      })
      //error server
      .catch(error => {
        res.status(404).json({ error })
      })

  });
};
