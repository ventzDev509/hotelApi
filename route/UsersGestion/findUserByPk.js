const { user } = require('../../db/sequelize')
const isAuth=require('../UsersGestion/isAuth')
module.exports = (app) => {
    app.get('/api/user/get/:id',isAuth, (req, res) => {
        const id = req.params.id
        user.findOne({ where: { id: id } })
            .then(response => {
                if (response) {
                    const userInfos = {
                        firstName: response.firstName,
                        lastName: response.lastName,
                        email: response.email,
                        address: response.address,
                        ville: response.ville,
                        pays: response.pays,
                        telephone: response.telephone
                    }
                    res.status(200).json({ userInfos })
                }

            })
    })

}