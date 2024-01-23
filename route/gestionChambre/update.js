/*
 * This file handles the update of room information through a POST request.
 * It requires a room ID in the endpoint and uses Multer for image upload.
 */

// Importing necessary modules and dependencies
const { chambre } = require('../../db/sequelize');
const updateValidation = require('../../validationDatas/roomValidation');
const multer = require("multer");
const path = require("path");


// Exporting the route handling function
module.exports = (app) => {
    // Define a POST route for updating room information
    app.post("/api/room/update/:idChambre", (req, res) => {
        // Extract the room ID from the endpoint parameters
        const id = req.params.idChambre;

        // Validate the received data
        const dataValidate = {
            "roomType": req.body.roomType,
            "roomDescription": req.body.roomDescription,
            "nightlyPrice": req.body.nightlyPrice,
            "numberOfPersons": req.body.numberOfPersons,
            "amenities": req.body.amenities,
            "status": req.body.status,
        };
        const { error } = updateValidation(dataValidate).updateChambreValidate;
        // If there is a validation error, return a JSON response with the error message
        if (error) return res.status(400).json({ msg: error.details[0].message });

        // Check if the room exists
        chambre.findOne({ where: { codeChambre: id } })
            .then((response) => {
                // If the room does not exist, return a 400 Bad Request response
                if (response.length == 0) return res.status(400).send("La chambre n'existe pas");
                else {
                    let data
                    // Create the image URL for storage
                    if (req.body.imageUrl) {
                        const imageUrl = "http://ventzdev-hotel.free.nf/images/" + req.body.imageUrl;
                        data = {
                            "roomType": req.body.roomType,
                            "roomDescription": req.body.roomDescription,
                            "nightlyPrice": req.body.nightlyPrice,
                            "numberOfPersons": req.body.numberOfPersons,
                            "amenities": req.body.amenities,
                            "status": req.body.status,
                            "imageUrl": imageUrl
                        };
                    } else {
                        data = {
                            "roomType": req.body.roomType,
                            "roomDescription": req.body.roomDescription,
                            "nightlyPrice": req.body.nightlyPrice,
                            "numberOfPersons": req.body.numberOfPersons,
                            "amenities": req.body.amenities,
                            "status": req.body.status,
                        };
                    }

                    // If an image is uploaded, update room information and change the image

                    // Update the room
                    chambre.update({ ...data }, { where: { codeChambre: id } })
                        .then(response => {
                            if (response) {
                                const msg = "Chambre modifiée avec succès";
                                res.status(201).json({ msg, response });
                            }

                        })
                        .catch(error => res.json(error));

                }
            });
    });
};
