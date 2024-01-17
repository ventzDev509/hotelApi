/*
 * This endpoint handles user login by verifying the provided credentials.
 * It generates a JWT token upon successful login.
 */

// Importing necessary modules and dependencies
const { admin } = require('../../db/sequelize');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const adminValidate = require('../../validationDatas/adminValidate');
const privateKey=require('./auth/privateKey')
// Exporting the route handling function
module.exports = (app) => {
    app.post('/api/admin/login', (req, res) => {
        // Validate the login credentials
        const { error } = adminValidate(req.body).adminValidate;
        // Return an error response if the credentials are invalid
        if (error) return res.status(500).json(error.details[0].message);

        // Find the user in the database by email
        admin.findOne({ where: { username: req.body.username } })
            .then(userResponse => {
                // Check if the user exists
                if (!userResponse) {
                    res.json({ msg: "Incorrect Username" });
                } else {
                    // Compare the provided password with the hashed password in the database
                    bcrypt.compare(req.body.password, userResponse.password)
                        .then(passwordMatch => {
                            // Check if the passwords match
                            if (!passwordMatch) return res.json({ msg: "Incorrect password" });
                            // Generate a JWT token with the username
                            res.status(200).json({
                                msg: "Login successful",
                                token: jwt.sign({ username: userResponse.username }, privateKey , { expiresIn: "24h" })
                            });
                        })
                        .catch(error => res.status(500).json(error));
                }
            })
            .catch(error => res.status(500).json(error));
    });
};
