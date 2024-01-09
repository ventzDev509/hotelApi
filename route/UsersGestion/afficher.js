const { user } = require('../../db/sequelize')
const isAuth=require('../UsersGestion/isAuth')
module.exports = (app) => {
    app.get('/api/user',isAuth, (req, res) => {
        user.findAll()
            .then(userD => {
                //pakouri tout done yo epi afiche info itilizate api ah dwe gen
                const data = userD.map(e => (
                    {
                        "firstName": e.firstName,
                        "lastName": e.lastName,
                        "ville": e.ville,
                        "pays": e.pays,
                        "address": e.address
                    }
                )
                )
                const msg = "la liste de tous les utilisateurs"
                res.status(200).json({ msg, data })
            }).catch(error => {
                res.json({ error })
            })
    })
}