const {chambre}=require('../../db/sequelize')
module.exports=(app)=>{
    app.get("/api/room/all",(req,res)=>{
        chambre.findAll()
        .then(response=>{
            res.status(201).json(response)
        })
        .catch(error=>console.log(error))
    }) 
}