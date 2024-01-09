//appel de l'instance user du modele user
const { user } = require('../../db/sequelize')
const isAuth=require('../UsersGestion/isAuth')
module.exports = (app) => {
    //pint de terminaison de l'api
    app.post('/api/user/delete/:id',isAuth, (req, res) => {
        
        // recuperation de l'id passer en paramettre
        const id=req.params.id
        //verifier si un id a ete trouver dans le lien  si non on 
        if(!id)return res.status(401).json({msg:"Id invalide"})
        //recuperer les informations d'un utilisateur par son id
        user.findOne({where:{id:id}})
            
          .then(response=>{
            if (response==null){
                res.status(404).json({msg:"Aucun compte n'a ete trouver"})
            }else{
                user.destroy({ where: { id:id } })
                .then(_ => 
                    {
                        const msg=`User ${response.firstName } delete  avec succes`
                        res.json({msg})
                    }
                ) .catch(error=>{console.log(error)})
            }
          })
          .catch(error=>{console.log("erreur server")})
       
    })
}