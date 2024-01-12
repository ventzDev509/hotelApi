module.exports = (app) => {
    // Add user
    require('./addUser')(app);
    // User Login
    require('./login')(app);
    // Update user
    require('./update')(app);
    // Delete user
    require('./delete')(app);
    // Show all users
    require('./afficher')(app);
    // Find user by primary key
    require('./findUserByPk')(app);
}