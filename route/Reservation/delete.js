/*
 * This file handles the deletion of a reservation through a POST request.
 * It utilizes Sequelize to interact with the database and deletes a reservation based on the provided ID.
 */

// Importing necessary modules and dependencies
const { reservation } = require('../../db/sequelize');

// Exporting the route handling function
module.exports = (app) => {
    // Define a POST route for deleting a reservation by ID
    app.post("/api/reservation/delete/:id", (req, res) => {
        // Extract the reservation ID from the request parameters
        const id = req.params.id;

        // Check if a reservation with the specified ID exists
        reservation.findOne({
            where: {
                id: id
            }
        })
        .then(existingReservation => {
            if (!existingReservation) {
                const msg = `No reservation was found`;
                res.status(404).json({ msg });
            } else {
                // Delete the reservation based on the ID
                reservation.destroy({ where: { id: id } })
                    .then(_ => {
                        const msg = "Deletion successful";
                        res.json({ msg });
                    })
                    .catch(error => res.status(500).json(error));
            }
        });
    });
};
