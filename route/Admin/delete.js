const { admin } = require('../../db/sequelize')
module.exports = (app) => {
    app.post('/api/admin/delete/:username', (req, res) => {
        const user = req.params.username
        admin.findAll({ where: { username: user } })
            .then(response => {
                if (response.length > 0) {
                    admin.destroy({ where: { username: user } })
                        .then(response => {
                            if (response) {
                                res.status(200).json({msg:"User delete successfully"})
                            }
                        })
                } else {
                    res.status(401).json({ msg: "User not found" })
                }
            })
    })
}