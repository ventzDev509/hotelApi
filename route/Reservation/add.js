/*
 * This file handles the creation of a new reservation through a POST request.
 * It performs validation, checks room availability, and updates room status if the reservation is successful.
 */

// Importing necessary modules and dependencies
const { reservation } = require('../../db/sequelize');
const { chambre } = require('../../db/sequelize');
const addReservationValidation = require('../../validationDatas/reservationValidation');
const isAuthAdmin=require('../Admin/auth/isAuth')
// Exporting the route handling function
module.exports = (app) => {
    // Define a POST route for creating a new reservation
    app.post('/api/reservation/new/:codeChambre',isAuthAdmin, (req, res) => {
        const adminConnect=req.admin
        const codeChambre=req.params.codeChambre
        // Get the current date
        const date = new Date();
        // Convert user input dates to Date objects
        const dateUserDebut = new Date(req.body.dateDebut);
        const dateFin = new Date(req.body.dateFin);
        const currentDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());

        // Validate the received data
        const { error } = addReservationValidation(req.body).addReservationV;
        if (error) return res.status(501).json(error.details[0].message);

        // Check if the room is already reserved for the specified dates
        reservation.findOne({
            where: {
                codeChambre:codeChambre,
                dateDebut: req.body.dateDebut,
                dateFin: req.body.dateFin
            }
        })
            .then(existingReservation => {
                if (existingReservation) {
                    const msg = `The room is not available until ${existingReservation.dateFin}`;
                    res.json({ msg });
                } else {
                    // Check if the specified room exists
                    chambre.findOne({ where: { codeChambre:codeChambre } })
                        .then(roomResponse => {
                            if (roomResponse != null) {
                                // Validate the number of persons and room capacity
                                if (req.body.NumberOfPerson < 1) {
                                    const msg = `The room must have at least one person`;
                                    return res.json({ msg });
                                } else {
                                    if (roomResponse.numberOfPersons < req.body.NumberOfPerson) {
                                        const msg = `The room can accommodate up to ${roomResponse.numberOfPersons} persons`;
                                        return res.json({ msg });
                                    } else {
                                        // Check if the reservation dates are valid
                                        if (dateUserDebut > currentDate) {
                                            if (dateUserDebut > dateFin) {
                                                const msg = "The reservation end date must be greater than the start date";
                                                return res.json({ msg });
                                            } else {
                                                // Create the reservation and update room status
                                                reservation.create({...req.body,codeChambre:codeChambre,amountChambre:req.body.amountChambre,"userAdmin":adminConnect})
                                                    .then(reservationResponse => {
                                                        const msg = "Your reservation has been successfully made";
                                                        res.json({ msg, reservationResponse });
                                                        const data = {
                                                            "status": "occupe"
                                                        };
                                                        chambre.update({ ...data }, { where: { codeChambre: reservationResponse.codeChambre } });
                                                    })
                                                    .catch(error => res.json(error));
                                            }
                                        } else {
                                            return res.json({ msg: "You cannot make a reservation for a past date" });
                                        }
                                    }
                                }
                            } else {
                                res.status(404).json({ msg: "No room was found" });
                            }
                        });
                }
            });
    });
};
