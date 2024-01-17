const Joi = require("joi");

function AdminValidation(body){
    const admin=Joi.object({
        username:Joi.string().required(),
        password:Joi.string().min(10).required()
    })
    
    return{
        adminValidate:admin.validate(body)
    }
}
module.exports=AdminValidation