const { reservation } = require('../../db/sequelize')
module.exports = (app) => {
    app.post("/api/reservation/delete/:id", (req, res) => {
        const id = req.params.id
        reservation.findOne({
            where: {
                id: id
            }
        })
            .then(response => {
                if (!response) {
                    const msg = `Aucun reservation n'a ete trouver`
                    res.status(404).json({ msg })
                } else {
                    reservation.destroy({ where: { id: id } })
                      .then(response => {
                            const msg = "Delete Success"
                            res.json({ msg })
                        })
                      .catch(error => res.status(500).json(error))
                }
            })
    })
}