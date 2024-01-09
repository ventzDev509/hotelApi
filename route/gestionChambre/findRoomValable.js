const {chambre}=require('../../db/sequelize')
const multer=require('multer')
const upload = multer({ dest: 'images/' })
module.exports=(app)=>{
    app.get("/api/room/valable",(req,res)=>{
        chambre.findAll({where:{status:"occupe"}})
        .then(response=>{
            const msg="La liste des chambres libre"
            res.status(201).json({msg,response})
        })
        .catch(error=>res.status(500).json("erreur de server"))
    })
}