const { reservation } = require('../../db/sequelize')
const { chambre } = require("../../db/sequelize")
const addReservationV = require('../../validationDatas/reservationValidation')
module.exports = (app) => {
    app.post('/api/reservation/update/:id', (req, res) => {
        const id = req.params.id
        const date = new Date();
        const dateUserDebut = new Date(req.body.dateDebut);
        const dateFin = new Date(req.body.dateFin)
        const currentDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());

        const { error } = addReservationV(req.body).ValidateUpdateReservation
        if (error) return res.status(501).json(error.details[0].message)
        reservation.findOne({
            where: {
                id: id,
            }
        })
            .then(response => {
                if (!response) {
                    const msg = `Aucun reservation n'a ete trouver`
                    res.json({ msg })
                } else {
                    reservation.findOne({ where: { id: id } })
                        .then(dataResponse => {
                            if (req.body.NumberOfPerson < 1) {
                                const msg = `La chambre doit avoir au moin une personne`
                                return res.json({ msg })
                            } else {
                                if (dataResponse.numberOfPersons < req.body.NumberOfPerson) {
                                    const msg = `La chambre peut avoir ${dataResponse.numberOfPersons} personnes pas plus`
                                    return res.json({ msg })
                                } else {
                                    if (dateUserDebut > currentDate) {
                                        if (dateUserDebut > dateFin) {
                                            const msg = "La dete fin du reservation doit etre supperieur a la date debut"
                                            return res.json({ msg })
                                        } else {
                                            chambre.findOne({where:{codeChambre:req.body.codeChambre}})
                                                .then(chambreExiste=>{
                                                   if(chambreExiste!=null){
                                                    reservation.update(req.body, { where: { id: id } })
                                                    .then(response => {
                                                        const msg = "Update Success"
                                                        res.json({ msg })
                                                        const data = {
                                                            "status": "occupe"
                                                        }
                                                        chambre.update({ ...data }, { where: { codeChambre: dataResponse.codeChambre } })
                                                    })
                                                    .catch(error => res.json(error))
                                                   }else{
                                                    res.status(404).json({msg:"Numero chambre invalide"})
                                                   }
                                                })
                                          
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