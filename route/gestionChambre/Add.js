/*
 * This file handles the creation of a new room through a POST request.
 * It uses Multer for file upload and validates the provided data before adding the room to the database.
 */

// Importing necessary modules and dependencies
const { chambre } = require('../../db/sequelize');
const multer = require("multer");
const path = require("path");
const isAuthAdmin=require("../Admin/auth/isAuth")
const addChambreValidation = require('../../validationDatas/roomValidation');
const { Op } = require('sequelize');

// Configuring Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Specify the destination folder for uploaded files
        cb(null, "http://ventzdev-hotel.free.nf/images/");
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
    // Define a POST route for creating a new room with file upload
    app.post('/api/room/new',isAuthAdmin, upload.single("image"), (req, res) => {
        // get admin connect
        const admin=req.admin
        // Extract image buffer from the uploaded file
        const imageBuffer = req.file.buffer;

        // Validate the received data with the 'addChambreValidate' function
        const { error } = addChambreValidation(req.body).addChambreValidate;

        // If the data is not valid, return a JSON message with the error
        if (error) return res.status(400).json(error.details[0].message);

        // Check if a room with the specified details already exists
        chambre.findOne({
            where: {
                [Op.or]:{
                    codeChambre: req.body.codeChambre,
                    // roomType: req.body.roomType,
                    // nightlyPrice: req.body.nightlyPrice,
                    // numberOfPersons: req.body.numberOfPersons,
                    // amenities: req.body.amenities,
                }
               
            }
        })
            .then(response => {
                if (response != null) return (res.json({ msg: "Room already exists" }));

                // Create an image URL using the local server address and file path
                const imageUrl = "http://ventzdev-hotel.free.nf/images/" + req.body.imageUrl;

                // Remove imageUrl from the request body
                delete req.body.imageUrl;

                // Prepare data for creating a new room
                const data = {
                    "codeChambre": req.body.codeChambre,
                    "roomType": req.body.roomType,
                    "roomDescription": req.body.roomDescription,
                    "nightlyPrice": req.body.nightlyPrice,
                    "numberOfPersons": req.body.numberOfPersons,
                    "amenities": req.body.amenities,
                    "status": req.body.status,
                    "admin":admin
                };

                // Create the new room in the database
                chambre.create({ ...data, imageUrl: imageUrl })
                    .then(response => {
                        const msg = "Room added successfully";
                        res.status(200).json({ msg, response });
                    })
                    .catch(error=>res.json(error))
            });
    });
};
