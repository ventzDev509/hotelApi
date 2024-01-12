const { Op } = require('sequelize')
const { reservation } = require('../../db/sequelize')
module.exports = (app) => {
    app.get("/api/reservation/search/:data", (req, res) => {
        const search = req.params.data
        reservation.findAll({
            where: {
                dateDebut: { [Op.like]: `%${search}%` },
                // dateFin:{[Op.like]:`%${search}%`},
                // codeChambre:{[Op.like]:`%${search}%`}
            }
        })
        .then(response=>{
            if(response.length>0){
                res.status(201).json(response)
            }else{
                res.status(404).json({msg:"Aucune reservation n'a ete trouver"})
            }
        })
    })
}