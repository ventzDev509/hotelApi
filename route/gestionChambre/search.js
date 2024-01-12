/*
 * This file handles room search functionality through a GET request.
 * It searches for rooms with a status containing the specified search term and returns the results as a JSON response.
 */

// Importing necessary modules and dependencies
const { Op } = require('sequelize');
const { chambre } = require('../../db/sequelize');
const searchValidation = require('../../validationDatas/roomValidation');

// Exporting the route handling function
module.exports = (app) => {
    // Define a GET route for room search
    app.get("/api/room/search/:search", (req, res) => {
        // Extract the search term from the request parameters
        const search = req.params.search;

        // Search for rooms with a status containing the specified search term
        chambre.findAll({
            where: {
                status: { [Op.like]: `%${search}%` },
            }
        })
            .then(response => {
                // Return the search results as a JSON response with a 201 status
                res.status(201).json(response);
            })
            .catch(error => console.log(error));
    });
};
