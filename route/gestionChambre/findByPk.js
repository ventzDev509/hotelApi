/*
 * This file retrieves a specific room by its ID through a GET request.
 * It fetches the room record from the database based on the provided ID and returns it as a JSON response.
 */

// Importing necessary modules and dependencies
const { chambre } = require('../../db/sequelize');

// Exporting the route handling function
module.exports = (app) => {
    // Define a GET route to retrieve a specific room by its ID
    app.get("/api/room/:id", (req, res) => {
        // Extract the ID parameter from the request
        const id = req.params.id;

        // Find the room in the database by its ID
        chambre.findOne({ where: { codeChambre: id } })
            .then(response => {
                // If the room is found, return a JSON response with a 201 status
                res.status(201).json(response);
            })
            .catch(error => console.log(error));
    });
};
