/*
 * This file handles the retrieval of all reservations through a GET request.
 * It utilizes Sequelize to interact with the database and fetches all reservation records.
 */

// Importing necessary modules and dependencies
const { reservation } = require('../../db/sequelize');

// Exporting the route handling function
module.exports = (app) => {
    // Define a GET route to fetch all reservations
    app.get("/api/reservation/all", (req, res) => {
        // Retrieve all reservation records from the database
        reservation.findAll()
            .then(response => {
                // Check if any reservations were found
                if (response.length > 0) {
                    return res.status(200).json(response);
                } else {
                    // Return a 404 status if no reservations were found
                    return res.status(404).json({ msg: "No reservations were found" });
                }
            })
            .catch(error => {
                // Handle any errors that may occur during the database query
                return res.status(500).json({ error: error.message });
            });
    });
};
