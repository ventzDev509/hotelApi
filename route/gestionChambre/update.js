const { chambre } = require('../../db/sequelize')
const updateValidation = require('../../validationDatas/roomValidation')
const multer = require("multer");
const path = require("path");
// Configuring Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Spécifiez le dossier de destination pour les fichiers téléchargés
        cb(null, "image");
    },
    filename: (req, file, cb) => {
        // Utilisez un nom de fichier unique pour éviter les conflits
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
    },
});
const upload = multer({ storage: storage });
module.exports = (app) => {
    app.post("/api/room/update/:id", upload.single("image"), (req, res) => {
        const id = req.params.id;
        const imageBuffer = req.file;
        const dataValidate = {
            "roomType": req.body.roomType,
            "roomDescription": req.body.roomDescription,
            "nightlyPrice": req.body.nightlyPrice,
            "numberOfPersons": req.body.numberOfPersons,
            "amenities": req.body.amenities,
            "status": req.body.status,
        }
        const { error } = updateValidation(dataValidate).updateChambreValidate
        if (error) return res.status(400).json({ msg: error.details[0].message })
        chambre.findAll({ where: { id: id } })
            .then((response) => {
                if (response.length == 0) return res.status(400).send("La chambre n'existe pas")
                else {
                    const imageUrl = "http://localhost/db/images/" + req.body.imageUrl;
                    chambre.findOne({ where: { imageUrl: imageUrl } })
                        .then(rps => {
                            if (!imageBuffer) {
                                const data = {
                                    "roomType": req.body.roomType,
                                    "roomDescription": req.body.roomDescription,
                                    "nightlyPrice": req.body.nightlyPrice,
                                    "numberOfPersons": req.body.numberOfPersons,
                                    "amenities": req.body.amenities,
                                    "status": req.body.status,
                                }
                                chambre.update({ ...data }, { where: { id: id } })
                                    .then(response => {
                                        const msg = "Chambre modifier avec success"
                                        res.status(201).json({ msg, response });
                                    })
                                    .catch(error => res.json(error))
                            } else {
                                const data = {
                                    "roomType": req.body.roomType,
                                    "roomDescription": req.body.roomDescription,
                                    "nightlyPrice": req.body.nightlyPrice,
                                    "numberOfPersons": req.body.numberOfPersons,
                                    "amenities": req.body.amenities,
                                    "status": req.body.status,
                                    "imageUrl": imageUrl
                                }
                                chambre.update({ ...data }, { where: { id: id } })
                                    .then(response => {
                                        const msg = "Chambre modifier avec success"
                                        res.status(201).json({ msg, response });
                                    })
                                    .catch(error => res.json(error))
                            }

                        })


                }
            })

    })
}
