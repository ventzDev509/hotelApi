const jwt = require('jsonwebtoken')
const key = require('./privateKey')
module.exports = (req, res, next) => {
    // Extract the authorization header from the request
    const authorization = req.headers.authorization
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
        const admin = decodedToken.username;

        // Check if the provided email in the request body matches the decoded email
        if (req.body.username && req.body.username !== admin) {
            const msg = "Invalid identifier";
            return res.status(401).json({ msg });
        }

        // Attach the user's email to the request object
        req.admin = admin;
        next();
    } catch (error) {
        // Token verification failed, return an unauthorized status
        const msg = "You should log in";
        res.status(401).json({ msg, data: error });
    }

}