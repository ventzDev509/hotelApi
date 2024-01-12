/*
 * This file handles the updating of a reservation through a POST request.
 * It validates the provided data, checks the availability of the specified room, and updates the reservation accordingly.
 */

// Importing necessary modules and dependencies
const { reservation, chambre } = require('../../db/sequelize');
const addReservationV = require('../../validationDatas/reservationValidation');

// Exporting the route handling function
module.exports = (app) => {
    // Define a POST route for updating a reservation by ID
    app.post('/api/reservation/update/:id', (req, res) => {
        // Extract the reservation ID from the request parameters
        const id = req.params.id;

        // Get the current date
        const date = new Date();
        const currentDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        const dateUserDebut = new Date(req.body.dateDebut);
        const dateFin = new Date(req.body.dateFin)
        // Validate the received data with the 'ValidateUpdateReservation' function
        const { error } = addReservationV(req.body).ValidateUpdateReservation;

        // If the data is not valid, return a JSON message with the error
        if (error) return res.status(501).json(error.details[0].message);

        // Check if a reservation with the specified ID exists
        reservation.findOne({
            where: {
                id: id,
            }
        })
        .then(existingReservation => {
            if (!existingReservation) {
                const msg = `No reservation was found`;
                res.json({ msg });
            } else {
                // Check the availability of the specified room
                reservation.findOne({ where: { id: id } })
                    .then(dataResponse => {
                        if (req.body.NumberOfPerson < 1) {
                            const msg = `The room must have at least one person`;
                            return res.json({ msg });
                        } else {
                            if (dataResponse.numberOfPersons < req.body.NumberOfPerson) {
                                const msg = `The room can accommodate ${dataResponse.numberOfPersons} people at most`;
                                return res.json({ msg });
                            } else {
                                // Perform date and room availability checks
                                if (dateUserDebut > currentDate) {
                                    if (dateUserDebut > dateFin) {
                                        const msg = "The reservation end date must be greater than the start date";
                                        return res.json({ msg });
                                    } else {
                                        chambre.findOne({ where: { codeChambre: req.body.codeChambre } })
                                            .then(chambreExiste => {
                                                if (chambreExiste != null) {
                                                    // Update the reservation
                                                    reservation.update(req.body, { where: { id: id } })
                                                        .then(response => {
                                                            const msg = "Update Success";
                                                            res.json({ msg });

                                                            // Update room status to 'occupied'
                                                            const data = {
                                                                "status": "occupe"
                                                            };
                                                            chambre.update({ ...data }, { where: { codeChambre: dataResponse.codeChambre } });
                                                        })
                                                        .catch(error => res.json(error));
                                                } else {
                                                    res.status(404).json({ msg: "Invalid room number" });
                                                }
                                            });
                                    }
                                } else {
                                    return res.json({ msg: "You cannot make a reservation for a past date" });
                                }
                            }
                        }
                    });
            }
        });
    });
};
