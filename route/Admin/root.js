module.exports=(app)=>{
    require("./create")(app)
    require('./update')(app)
    require('./delete')(app)
    require('./post')(app)
    require('./search')(app)
    require("./login")(app)
}