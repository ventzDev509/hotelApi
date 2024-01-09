const {chambre}=require('../../db/sequelize')

module.exports=(app)=>{
    app.get("/api/room/:id",(req,res)=>{
        const id=req.params.id
        chambre.findOne({where:{id:id}})
        .then(response=>{
            res.status(201).json(response)
        })
        .catch(error=>console.log(error))
    })
}