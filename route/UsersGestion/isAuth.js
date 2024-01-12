/*
 * This middleware checks for the presence of a valid token in the request header.
 * It verifies the token using JWT and attaches the user's email to the request object.
 */

// Importing necessary modules and dependencies
const jwt = require('jsonwebtoken');
const key = require('./privatekeys');

// Exporting the middleware function
module.exports = (req, res, next) => {
    // Extract the authorization header from the request
    const authorization = req.headers.authorization;

    // Check if the authorization header is missing
    if (!authorization) {
        const msg = "You did not provide a token";
        return res.status(401).json({ msg });
    }

    // Extract the token from the authorization header
    const token = authorization.split(' ')[1];

    try {
        // Verify the token using the secret key
        const decodedToken = jwt.verify(token, key);

        // Extract the user's email from the decoded token
        const usermail = decodedToken.email;

        // Check if the provided email in the request body matches the decoded email
        if (req.body.email && req.body.email !== usermail) {
            const msg = "Invalid identifier";
            return res.status(401).json({ msg });
        }

        // Attach the user's email to the request object
        req.userEmail = usermail;
        next();
    } catch (error) {
        // Token verification failed, return an unauthorized status
        const msg = "You should log in";
        res.status(401).json({ msg, data: error });
    }
};
