const isAuth = require('./auth/isAuth')
const {admin}=require('../../db/sequelize')
module.exports = (app) => {
    app.get("/api/admin/info", isAuth, (req, res) => {
        const adminName = req.admin
        admin.findOne({
            where: {
                username: adminName
            }
        })
        .then(adminInfos => {
            if(adminInfos){
                res.status(200).json(adminInfos)
            }
        })
    })
}