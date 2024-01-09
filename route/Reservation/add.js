const { reservation } = require('../../db/sequelize')
const { chambre } = require("../../db/sequelize")
const addReservationV = require('../../validationDatas/reservationValidation')
module.exports = (app) => {
    app.post('/api/reservation/new', (req, res) => {
        const date = new Date();
        const dateUserDebut = new Date(req.body.dateDebut);
        const dateFin = new Date(req.body.dateFin)
        const currentDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());

        const { error } = addReservationV(req.body).addReservationV
        if (error) return res.status(501).json(error.details[0].message)
        reservation.findOne({
            where: {
                codeChambre: req.body.codeChambre,
                dateDebut: req.body.dateDebut,
                dateFin: req.body.dateFin
            }
        })
            .then(response => {
                if (response) {
                    const msg = `La chambre n'est pas disponible jusq'au ${response.dateFin}`
                    res.json({ msg })
                } else {
                    chambre.findOne({ where: { codeChambre: req.body.codeChambre } })
                        .then(response => {
                            if (req.body.NumberOfPerson < 1) {
                                const msg = `La chambre doit avoir au moin une personne`
                                return res.json({ msg })
                            } else {
                                if (response.numberOfPersons < req.body.NumberOfPerson) {
                                    const msg = `La chambre peut avoir ${response.numberOfPersons} personnes pas plus`
                                    return res.json({ msg })
                                } else {
                                    if (dateUserDebut > currentDate) {
                                        if (dateUserDebut > dateFin) {
                                            const msg = "La dete fin du reservation doit etre supperieur a la date debut"
                                            return res.json({ msg })
                                        } else {
                                            reservation.create(req.body)
                                                .then(response => {
                                                    const msg = "Votre Reservation a ete effectue avec success"
                                                    res.json({ msg, response })
                                                    const data = {
                                                        "status": "occupe"
                                                    }
                                                    chambre.update({ ...data }, { where: { codeChambre: response.codeChambre } })
                                                })
                                                .catch(error => res.json(error))
                                        }
                                    } else {
                                        return res.json({ msg: "Vous ne pouvez pas faire une reservation pour une date passe" })
                                    }

                                }
                            }

                        })

                }

            })

    })
}