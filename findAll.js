/*
 * This file retrieves all rooms through a GET request.
 * It fetches all room records from the database and returns them as a JSON response.
 */

// Importing necessary modules and dependencies
const { chambre } = require('../../db/sequelize');

// Exporting the route handling function
module.exports = (app) => {
    // Define a GET route to retrieve all rooms
    app.get("/api/room/all", (req, res) => {
        // Find all rooms in the database
        chambre.findAll()
            .then(response => {
                // If rooms are found, return a JSON response with a 201 status
                res.status(201).json(response);
            })
            .catch(error => console.log(error));
    });
};
