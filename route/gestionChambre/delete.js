/*
 * This file handles the deletion of a room through a POST request.
 * It takes the room ID as a parameter and removes the corresponding room from the database.
 */

// Importing necessary modules and dependencies
const { chambre } = require('../../db/sequelize');

// Exporting the route handling function
module.exports = (app) => {
    // Define a POST route for deleting a room by ID
    app.post("/api/room/delete/:codeChambre", (req, res) => {
        // Extract the room ID from the request parameters
        const id = req.params.codeChambre;

        // Find the room with the specified ID in the database
        chambre.findOne({ where: { codeChambre: id } })
            .then(response => {
                // If no room is found, return a JSON message with a 404 status
                if (!response) {
                    const msg = "No room found";
                    return res.status(404).json({ msg });
                } else {
                    // If a room is found, delete it from the database
                    chambre.destroy({ where: { codeChambre: id } })
                        .then(response => {
                            if (response) {
                                const msg = "Room successfully deleted";
                                res.status(201).json({ msg });
                            }
                        })
                        .catch(error => console.log(error));
                }
            })
            .catch(error => console.log(error));
    });
};
