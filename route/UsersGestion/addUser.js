/*
 * This file handles the creation of a new user through a POST request.
 * It includes validation of received data, checks for existing email in the database,
 * and securely hashes the password before storing it.
 */

// Importing necessary modules and dependencies
const { user } = require('../../db/sequelize');
const bcrypt = require('bcrypt');
const validation = require('../../validationDatas/userValidation');

// Exporting the route handling function
module.exports = (app) => {
    // Define a POST route for creating a new user
    app.post('/api/user/new', (req, res) => {
        // Validate the received data 
        const { error } = validation(req.body).RegisterValidation;
        // Return an error message if the data is not correct
        if (error) return res.status(400).json({ msg: error.details[0].message });

        // Check if the email already exists in the database
        const email = req.body.email;
        user.findOne({ where: { email: email } })
            .then(response => {
                // If the email does not exist in the database
                if (response == null) {
                    // Hash the password using the bcrypt module
                    bcrypt.hash(req.body.password, 10)
                        .then(hash => {
                            // Return an error message if there is an issue with hashing
                            if (!hash) return res.status(500).json({ msg: "An error occurred, please try again later." });

                            // Remove the password from the user data in the request body
                            delete req.body.password;

                            // Create the user with the new data and hashed password
                            user.create({ ...req.body, password: hash })
                                .then(User => {
                                    const msg = "Account created successfully.";
                                    res.status(201).json({ msg });
                                })
                                .catch(error => res.status(500).json(error));
                        });
                } else {
                    // If the email already exists, return a JSON message
                    res.status(409).json({ msg: "This email is already in use." });
                }
            })
            // Server error
            .catch(error => res.status(500).json(error));
    });
};
