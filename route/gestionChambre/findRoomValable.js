/*
 * This file retrieves a list of occupied rooms through a GET request.
 * It fetches rooms from the database with the status set to "occupe" and returns them as a JSON response.
 */

// Importing necessary modules and dependencies
const { chambre } = require('../../db/sequelize');
const multer = require('multer');

// Configuring Multer for file upload
const upload = multer({ dest: 'images/' });

// Exporting the route handling function
module.exports = (app) => {
    // Define a GET route to retrieve a list of occupied rooms
    app.get("/api/room/valable", (req, res) => {
        // Find all rooms in the database with the status set to "occupe"
        chambre.findAll({ where: { status: "occupe" } })
            .then(response => {
                // If rooms are found, return a JSON response with a 201 status
                const msg = "La liste des chambres occupées";
                res.status(201).json({ msg, response });
            })
            .catch(error => res.status(500).json("Erreur de serveur"));
    });
};
