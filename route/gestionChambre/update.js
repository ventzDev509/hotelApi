/*
 * This file handles the update of room information through a POST request.
 * It requires a room ID in the endpoint and uses Multer for image upload.
 */

// Importing necessary modules and dependencies
const { chambre } = require('../../db/sequelize');
const updateValidation = require('../../validationDatas/roomValidation');
const multer = require("multer");
const path = require("path");

// Configuring Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Specify the destination folder for uploaded files
        cb(null, "image");
    },
    filename: (req, file, cb) => {
        // Use a unique filename to avoid conflicts
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
    },
});
const upload = multer({ storage: storage });

// Exporting the route handling function
module.exports = (app) => {
    // Define a POST route for updating room information
    app.post("/api/room/update/:id", upload.single("image"), (req, res) => {
        // Extract the room ID from the endpoint parameters
        const id = req.params.id;
        // Extract the image buffer from the uploaded file
        const imageBuffer = req.file;
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
        chambre.findAll({ where: { id: id } })
            .then((response) => {
                // If the room does not exist, return a 400 Bad Request response
                if (response.length == 0) return res.status(400).send("La chambre n'existe pas");
                else {
                    // Create the image URL for storage
                    const imageUrl = "http://localhost/db/images/" + req.body.imageUrl;
                    // Check if an image is uploaded
                    if (!imageBuffer) {
                        // If no image is uploaded, update room information without changing the image
                        const data = {
                            "roomType": req.body.roomType,
                            "roomDescription": req.body.roomDescription,
                            "nightlyPrice": req.body.nightlyPrice,
                            "numberOfPersons": req.body.numberOfPersons,
                            "amenities": req.body.amenities,
                            "status": req.body.status,
                        };
                        // Update the room
                        chambre.update({ ...data }, { where: { id: id } })
                            .then(response => {
                                const msg = "Chambre modifiée avec succès";
                                res.status(201).json({ msg, response });
                            })
                            .catch(error => res.json(error));
                    } else {
                        // If an image is uploaded, update room information and change the image
                        const data = {
                            "roomType": req.body.roomType,
                            "roomDescription": req.body.roomDescription,
                            "nightlyPrice": req.body.nightlyPrice,
                            "numberOfPersons": req.body.numberOfPersons,
                            "amenities": req.body.amenities,
                            "status": req.body.status,
                            "imageUrl": imageUrl
                        };
                        // Update the room
                        chambre.update({ ...data }, { where: { id: id } })
                            .then(response => {
                                const msg = "Chambre modifiée avec succès";
                                res.status(201).json({ msg, response });
                            })
                            .catch(error => res.json(error));
                    }
                }
            });
    });
};
