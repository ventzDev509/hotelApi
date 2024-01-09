const { chambre } = require('../../db/sequelize')

module.exports = (app) => {
    app.post("/api/room/delete/:id", (req, res) => {
        const id = req.params.id;
        
        chambre.findOne({ where: { id: id } })
            .then(response => {
                if (!response) {
                    const msg = "Aucun Chambre n'a ete trouver"
                    return res.status(404).json({ msg }) 

                } else {
                    chambre.destroy({ where: { id: id } })
                    .then(response=>{
                        const msg="Chambre Supprimer avec success"
                        res.status(201).json({msg})
                    })

                }
            })
            .catch(error=>console.log(error))
    }) 
}