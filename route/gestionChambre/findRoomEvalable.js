const {chambre}=require('../../db/sequelize')
module.exports=(app)=>{
    app.get("/api/room/evalable",(req,res)=>{
        chambre.findAll({where:{status:"Libre"}})
        .then(response=>{
            const msg="La liste des chambres libre"
            res.status(201).json({msg,response})
        })
        .catch(error=>res.status(500).json("erreur de server"))
    })
} 