const { admin } = require('../../db/sequelize')
const adminValidate = require('../../validationDatas/adminValidate')
const bcrypt = require('bcrypt')
module.exports = (app) => {
    app.post('/api/admin/update', (req, res) => {
        const { error } = adminValidate(req.body).adminValidate
        const user = "Eventz"
        if (error) {
            return res.status(400).json(error.details[0].message)
        } else {
            admin.findAll({ where: { username: user } })
                .then(response => {

                    if (response.length > 0) {

                        bcrypt.hash(req.body.password, 10)
                            .then(passwordHash => {
                                // Return an error message if there is an issue with hashing
                                if (!passwordHash) return res.status(500).json({ msg: "An error occurred, please try again later." });
                                delete req.body.password
                                admin.update({ ...req.body, password: passwordHash }, { where: { username: user } })
                                    .then(response => {
                                        res.status(201).json({ msg: "User Update successfully" })
                                    })

                            })
                    } else {
                        res.json({ msg: "Username Not found" })
                    }
                })

        }

    })
}