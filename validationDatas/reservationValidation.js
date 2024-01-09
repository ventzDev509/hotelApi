const Joi = require("joi");


function reservationValidate(body) {
    const AddReservationValidate = Joi.object({
        emailUser: Joi.string().email().required().trim(),
        FullName: Joi.string().trim().required(),
        telephone: Joi.string().trim().required(),
        addresse: Joi.string().trim().required(),
        NumberOfPerson: Joi.number().integer().required(),
        codeChambre: Joi.string().trim().required(),
        dateDebut: Joi.string().trim().required(),
        dateFin: Joi.string().trim().required()
    })
    return {
        addReservationV:AddReservationValidate.validate(body)
    }
}
module.exports=reservationValidate