const joi = require('joi')
const search = require('../route/gestionChambre/search')

function chambreValidate(body) {
    const addValidation = joi.object({
        codeChambre:joi.number().integer().required(),
        roomType: joi.string().trim().min(3).required(),
        roomDescription: joi.string().trim().required(),
        nightlyPrice: joi.number().required(),
        numberOfPersons: joi.number().integer().required(),
        amenities: joi.string().trim().required(),
        status: joi.string().required(),
        imageUrl: joi.string().trim().required()
    })

    const UpdateValidation = joi.object({
        roomType: joi.string().trim().min(3).required(),
        roomDescription: joi.string().trim().required(),
        nightlyPrice: joi.number().required(),
        numberOfPersons: joi.number().integer().required(),
        amenities: joi.string().trim().required(),
        imageUrl: joi.string(),
        status: joi.string().required(),
    })
  
    return {
        addChambreValidate: addValidation.validate(body),
        updateChambreValidate: UpdateValidation.validate(body),
    }
}
module.exports = chambreValidate;