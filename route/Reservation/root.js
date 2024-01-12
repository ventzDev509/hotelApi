module.exports = (app) => {
    require('./add')(app);
    require('./update')(app)
    require("./afficher")(app)
    require("./delete")(app)
    require('./search')(app)
}