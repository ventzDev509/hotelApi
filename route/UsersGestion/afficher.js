/*
 * This file handles the retrieval of all user data through a GET request.
 * It requires authentication (isAuth) for the API endpoint.
 */

// Importing necessary modules and dependencies
const { user } = require('../../db/sequelize');
const isAuth = require('../UsersGestion/isAuth');

// Exporting the route handling function
module.exports = (app) => {
    // Define a GET route for retrieving all user data
    app.get('/api/user', isAuth, (req, res) => {
        user.findAll()
            .then(userData => {
                // Extract relevant user information and format it
                const data = userData.map(e => (
                    {
                        "fullName": e.fullName,
                        "email": e.email,
                        "address": e.address,
                        "pays": e.pays,
                        "address": e.address
                    }

                ));

                const msg = "List of all users";
                res.status(200).json({ msg, userData });
            })
            .catch(error => {
                res.status(500).json({ error });
            });
    });
};
