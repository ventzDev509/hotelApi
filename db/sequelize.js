const { DataTypes, Sequelize } = require("sequelize");
const User = require("../models/User");
const Admin=require('../models/Admin')
const CHAMBRE=require('../models/chambre')
const RESERVATION=require('../models/Reservation')
require("dotenv").config()
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: "mysql",
});
 
sequelize 
  .authenticate()
  .then((_) => "connexion reussir")
  .catch((error) => console.log({msg:"erreur de connexion "+error }));

const user = User(sequelize, DataTypes);
const admin=Admin(sequelize,DataTypes)
const reservation=RESERVATION(sequelize,DataTypes)
const chambre=CHAMBRE(sequelize,DataTypes)

const initDb = () => {
  return sequelize.sync({force:false}).then((_) => { }); 
}; 

module.exports = {
  initDb,
  user, 
  admin,
  reservation,
  chambre,
};
