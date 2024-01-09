const { chambre } = require('../../db/sequelize')
const multer = require("multer");
const path = require("path");
const addChambreValidation = require('../../validationDatas/roomValidation')

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
    app.post('/api/room/new', upload.single("image"), (req, res) => {
        const imageBuffer = req.file.buffer;
        const { error } = addChambreValidation(req.body).addChambreValidate
        if (error) return res.status(400).json(error.details[0].message)
        chambre.findOne({
            where: {
                roomType: req.body.roomType,
                codeChambre:req.body.codeChambre,
                nightlyPrice: req.body.nightlyPrice,
                numberOfPersons: req.body.numberOfPersons,
                amenities: req.body.amenities,
            }
        })
            .then(response => {
                if (response != null) return (res.json({ msg: "Chambre existe deja" }))
                const imageUrl="http://localhost/db/images/"+req.body.imageUrl;
                delete req.body.imageUrl
                const data={ 
                    "codeChambre":req.body.codeChambre,
                    "roomType":req.body.roomType,
                    "roomDescription":req.body.roomDescription,
                    "nightlyPrice":req.body.nightlyPrice,
                    "numberOfPersons":req.body.numberOfPersons,
                    "amenities":req.body.amenities,
                    "status":req.body.status,
                }
                chambre.create({...data,imageUrl:imageUrl})
                    .then(response => {
                        const msg = "Chambre Ajouter avec success"
                        res.status(200).json({ msg, response })
                    })
            })
    })
}