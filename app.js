const express = require('express')
const sequelize = require('./db/sequelize')
const bodyParser = require('body-parser')
require('dotenv').config()

const cors = require('cors')
const { required } = require('joi')
const app = express()
const PORT = 3000
sequelize.initDb()
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require('./route/image')(app)
// *************GESTION ROUTE UTILISATEUR CRUD************
// add user
require('./route/UsersGestion/addUser')(app) 
// user Login
require('./route/UsersGestion/login')(app) 
//update user
require('./route/UsersGestion/update')(app)
//delete userSelect all
require('./route/UsersGestion/delete')(app)
//show all userSelect:
require('./route/UsersGestion/afficher')(app)
//find user by pk
require('./route/UsersGestion/findUserByPk')(app)

 // ---------------------------------
// ---------------------------------


// <--- =======================crud chambre========================== ===>
require('./route/gestionChambre/Add')(app)
require('./route/gestionChambre/update')(app)
require('./route/gestionChambre/findAll')(app)
require('./route/gestionChambre/delete')(app)
// liste des chambre libre 
require('./route/gestionChambre/findRoomEvalable')(app)
// liste des chambre occupe 
require('./route/gestionChambre/findRoomValable')(app)
//find by pk
require('./route/gestionChambre/findByPk')(app)
//all chambre
require('./route/gestionChambre/search')(app) 
// <-- ----------------fin---------   -->

// ==========================reservation Crud==============================
require('./route/Reservation/add')(app)

// dashbord 
require('./route/dashbord/infosUser')(app)
app.use(({ res }) => {
    res.status(404).json("erreur page non trouver")
}) 

app.listen(process.env.PORT, () => `app start to port ${PORT} `)