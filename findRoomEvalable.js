/*
 * This file retrieves a list of available rooms through a GET request.
 * It fetches rooms from the database with the status set to "Libre" and returns them as a JSON response.
 */

// Importing necessary modules and dependencies
const { chambre } = require('../../db/sequelize');

// Exporting the route handling function
module.exports = (app) => {
    // Define a GET route to retrieve a list of available rooms
    app.get("/api/room/evalable", (req, res) => {
        // Find all rooms in the database with the status set to "Libre"
        chambre.findAll({ where: { status: "Libre" } })
            .then(response => {
                // If rooms are found, return a JSON response with a 201 status
                const msg = "La liste des chambres libres";
                res.status(201).json({ msg, response });
            })
            .catch(error => res.status(500).json("Erreur de serveur"));
    });
};
