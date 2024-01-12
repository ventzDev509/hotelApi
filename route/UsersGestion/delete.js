/*
 * This file handles the deletion of a user through a POST request.
 * It requires authentication (isAuth) for the API endpoint.
 */

// Importing necessary modules and dependencies
const { user } = require('../../db/sequelize');
const isAuth = require('../UsersGestion/isAuth');

// Exporting the route handling function
module.exports = (app) => {
    // Define a POST route for deleting a user by ID
    app.post('/api/user/delete/:id', isAuth, (req, res) => {
        // Retrieve the ID passed as a parameter
        const id = req.params.id;

        // Check if an ID was found in the link; if not, return an invalid ID message
        if (!id) return res.status(401).json({ msg: "Invalid ID" });

        // Retrieve user information by ID
        user.findOne({ where: { id: id } })
            .then(response => {
                if (response == null) {
                    // No account was found with the given ID
                    res.status(404).json({ msg: "No account was found" });
                } else {
                    // Delete the user with the specified ID
                    user.destroy({ where: { id: id } })
                        .then(_ => {
                            const msg = `User ${response.fullName} deleted successfully`;
                            res.json({ msg });
                        })
                        .catch(error => {
                            console.log(error);
                            res.status(500).json(error);
                        });
                }
            })
            .catch(error => {
                console.log("Server error");
                res.status(500).json({ error });
            });
    });
};
