const joi = require('joi')

function validation(body) {
  //--------------VALIDATION USER DATA-----------------
  //user register
  const uservalidationRegister = joi.object({
    fullName: joi.string().min(2).max(30).trim().required(),
    email: joi.string().email().trim().required(),
    password: joi.string().min(8).max(40).trim().required(),
  })

  //login validation data
  const uservalidationLogin = joi.object({
    email: joi.string().email().trim().required(),
    password: joi.string().trim().required(),

  })

  //update validation data
  const updateValidation = joi.object({
    fullName: joi.string().min(2).max(30).trim().required(),
    address: joi.string().min(2).trim().required(),
    // city:joi.string().min(2).trim().required(),
    // country:joi.string().min(2).trim().required(),
    telephone:joi.string().min(8).trim().required(),
    dateOfBirth:joi.string().trim().required() 
  })

  return {
    RegisterValidation: uservalidationRegister.validate(body),
    LoginValidation: uservalidationLogin.validate(body),
    updateValidation: updateValidation.validate(body)
  }

}
module.exports = validation;