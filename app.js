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
require('./route/UsersGestion/root')(app)


//===========================gestion chambre Roote =============================
require('./route/gestionChambre/root')(app)


// ========================== RESERVATION Route ===============================
require('./route/Reservation/root')(app)


// Dashboard 
require('./route/dashbord/infosUser')(app);



// Catch-all middleware for handling 404 errors
app.use(({ res }) => {
    res.status(404).json("Error: Page not found");
});

// Start the server
app.listen(PORT, () => console.log(`App started on port ${PORT}`));