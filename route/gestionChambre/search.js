const { Op } = require('sequelize')
const { chambre } = require('../../db/sequelize')
const searchValidation = require('../../validationDatas/roomValidation')
module.exports = (app) => {
    app.get("/api/room/search/:search", (req, res) => {
        const search = req.params.search

        chambre.findAll({
            where: {
                status: {[Op.like]:`%${search}%`},
            }
        })
            .then(response => {
                res.status(201).json(response)
            })
            .catch(error => console.log(error))

    })
}