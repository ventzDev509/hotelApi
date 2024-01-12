const express = require('express');
const sequelize = require('./db/sequelize');
const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require('cors');
const app = express();

// Initialize Sequelize database
sequelize.initDb();

// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Parse incoming JSON requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ************* USER MANAGEMENT CRUD ROUTES ************
require('./route/UsersGestion/root')(app)

//=========================== Room Management Routes =============================
require('./route/gestionChambre/root')(app)

// ========================== RESERVATION Routes ===============================
require('./route/Reservation/root')(app)

// Dashboard 
require('./route/dashbord/infosUser')(app);

// Catch-all middleware for handling 404 errors
app.use(({ res }) => {
    res.status(404).json("Error: Page not found");
});

// Start the server
app.listen(process.env.APP_PORT, () => console.log(`App started on port ${process.env.APP_PORT}`));
