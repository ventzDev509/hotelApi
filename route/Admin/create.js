const { admin } = require('../../db/sequelize')
const adminValidate = require('../../validationDatas/adminValidate')
const isAuthAdmin=require('./auth/isAuth')
const bcrypt = require('bcrypt')
module.exports = (app) => {
    app.post('/api/admin/new',isAuthAdmin, (req, res) => {
        const { error } = adminValidate(req.body).adminValidate
        if (error) {
            return res.status(400).json(error.details[0].message)
        } else {
            admin.findAll({ where: { username: req.body.username } })
                .then(response => {

                    if (response.length > 0) {
                        res.json({ msg: "Username in use" })
                    } else {
                        bcrypt.hash(req.body.password, 10)
                            .then(passwordHash => {
                                // Return an error message if there is an issue with hashing
                                if (!passwordHash) return res.status(500).json({ msg: "An error occurred, please try again later." });

                                delete req.body.password
                                admin.create({ ...req.body, password: passwordHash })
                                    .then(response => {
                                        res.status(201).json({ msg: "User create successfully" })
                                    })

                            })


                    }
                })

        }

    })
}