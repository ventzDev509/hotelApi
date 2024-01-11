const express = require('express');
const sequelize = require('./db/sequelize');
const bodyParser = require('body-parser');
require('dotenv').config();

const cors = require('cors');
const app = express();
const PORT = 3000;

// Initialize Sequelize database
sequelize.initDb();

// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Parse incoming JSON requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// ************* USER MANAGEMENT CRUD ROUTES ************
// Add user
require('./route/UsersGestion/addUser')(app);
// User Login
require('./route/UsersGestion/login')(app);
// Update user
require('./route/UsersGestion/update')(app);
// Delete user
require('./route/UsersGestion/delete')(app);
// Show all users
require('./route/UsersGestion/afficher')(app);
// Find user by primary key
require('./route/UsersGestion/findUserByPk')(app);

// ---------------------------------
// ---------------------------------

// <--- ======================= CRUD ROOM =========================== ===>
// Add room
require('./route/gestionChambre/Add')(app);
// Update room
require('./route/gestionChambre/update')(app);
// Find all rooms
require('./route/gestionChambre/findAll')(app);
// Delete room
require('./route/gestionChambre/delete')(app);
// List available rooms
require('./route/gestionChambre/findRoomEvalable')(app);
// List occupied rooms
require('./route/gestionChambre/findRoomValable')(app);
// Find room by primary key
require('./route/gestionChambre/findByPk')(app);
// Search for all rooms
require('./route/gestionChambre/search')(app);
// <-- ---------------- end ---------   -->

// ========================== RESERVATION CRUD ===============================
require('./route/Reservation/add')(app);
require('./route/Reservation/update')(app)
require("./route/Reservation/afficher")(app)
require("./route/Reservation/delete")(app)

// Dashboard 
require('./route/dashbord/infosUser')(app);

// Catch-all middleware for handling 404 errors
app.use(({ res }) => {
    res.status(404).json("Error: Page not found");
});

// Start the server
app.listen(PORT, () => console.log(`App started on port ${PORT}`));