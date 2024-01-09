const { user } = require('../../db/sequelize')
const isAuth=require('../UsersGestion/isAuth')
module.exports = (app) => {
    // app.use(passport.authenticate("jwt", { session: false }))
    app.get('/api/user-info',isAuth, (req, res) => {
        const email = req.userEmail 
        user.findOne({ where: { email: email } })
            .then(response => {
                const userInfos = {
                    "fullName": response.fullName,
                    "address": response.address,
                    "city": response.city,
                    "telephone": response.telephone,
                    "dateOfBirth":response.dateOfBirth,
                    "country": response.country,
                    "email":response.email,
                }
                res.status(200).json(userInfos )
            })
            .catch(error => res.status(500).json(error))
    })
}