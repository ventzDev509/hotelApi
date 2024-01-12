/*
 * This file handles the search for reservations based on a provided parameter.
 * It utilizes Sequelize and the Op operator for database queries.
 */

// Importing necessary modules and dependencies
const { Op } = require('sequelize');
const { reservation } = require('../../db/sequelize');

// Exporting the route handling function
module.exports = (app) => {
    // Define a GET route for searching reservations
    app.get("/api/reservation/search/:data", (req, res) => {
        // Extract the search parameter from the request
        const search = req.params.data;

        // Perform a database query to find reservations matching the search parameter
        reservation.findAll({
            where: {
                [Op.or]: [
                    { dateDebut: { [Op.like]: `%${search}%` } },
                    { dateFin: { [Op.like]: `%${search}%` } },
                    { codeChambre: { [Op.like]: `%${search}%` } }
                ]
            }
        })
            .then(response => {
                // Check if any matching reservations were found
                if (response.length > 0) {
                    res.status(200).json(response);
                } else {
                    // Return a 404 status if no reservations were found
                    res.status(404).json({ msg: "No reservations were found" });
                }
            })
            .catch(error => {
                // Handle any errors that may occur during the database query
                res.status(500).json({ error: error.message });
            });
    });
};
