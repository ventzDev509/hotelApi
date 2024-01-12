/*
 * This file retrieves user information by ID through a GET request.
 * It requires authentication (isAuth) for the API endpoint.
 */

// Importing necessary modules and dependencies
const { user } = require('../../db/sequelize');
const isAuth = require('../UsersGestion/isAuth');

// Exporting the route handling function
module.exports = (app) => {
    // Define a GET route for retrieving user information by ID
    app.get('/api/user/get/:id', isAuth, (req, res) => {
        // Retrieve the ID passed as a parameter
        const id = req.params.id;

        // Find a user by the specified ID
        user.findOne({ where: { id: id } })
            .then(response => {
                if (response) {
                    // User found, extract relevant information
                    const userInfos = {
                        firstName: response.firstName,
                        lastName: response.lastName,
                        email: response.email,
                        address: response.address,
                        ville: response.ville,
                        pays: response.pays,
                        telephone: response.telephone
                    };
                    res.status(200).json({ userInfos });
                }
            })
            .catch(error => {
                console.log(error);
                res.status(500).json({ error });
            });
    });
};
