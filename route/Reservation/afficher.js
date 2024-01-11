const { reservation } = require('../../db/sequelize')
module.exports = (app) => {
    app.get("/api/reservation/all", (req, res) => {
        reservation.findAll()
            .then(response => {
                if (response) {
                    return res.status(200).json(response)
                }else{
                    return res.status(404).json({msg:"Auncun reservation n'a ete triuver"})
                }
            })
    })
}
