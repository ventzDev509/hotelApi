const { admin } = require('../../db/sequelize')

module.exports = (app) => {
    app.get("/api/admin/search/:username", (req, res) => {
        const seach=req.params.username
        admin.findAll({ where: {username:seach} })
            .then((response) =>{
                res.status(200).json(response)
            })
    })
}