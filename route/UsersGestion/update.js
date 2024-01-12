/*
 * This endpoint updates user information through a POST request.
 * It requires authentication (isAuth) for the API endpoint.
 */

// Importing necessary modules and dependencies
const { user } = require("../../db/sequelize");
const validation = require("../../validationDatas/userValidation");
const isAuth = require('../UsersGestion/isAuth');

// Exporting the route handling function
module.exports = (app) => {
  app.post("/api/user/update/", isAuth, (req, res) => {
    // Retrieving the user's email from the authenticated request
    const email = req.userEmail;

    // Validating the received data with the 'updateValidation' function
    const dataV = {
      "fullName": req.body.fullName,
      "telephone": req.body.telephone,
      "address": req.body.address,
      "dateOfBirth": req.body.dateOfBirth
    };
    const { error } = validation(dataV).updateValidation;

    // If the data is not valid, return a JSON message with the error
    if (error) return res.status(401).json({ msg: error.details[0].message });

    // Verifying if the user exists in the database before updating
    user.findOne({ where: { email: email } })
      .then(response => {
        if (response != null) {
          // User found, proceed with the update
          const dta = {
            "fullName": req.body.fullName,
            "address": req.body.address,
            "city": req.body.city,
            "country": req.body.country,
            "telephone": req.body.telephone,
            "dateOfBirth": req.body.dateOfBirth,
            "profile": req.body.profile,
          };

          // Update the user
          user
            .update(dta, { where: { email: email } })
            .then(
              _ => {
                // Retrieve the updated user information
                user.findOne({ where: { email: email } })
                  .then(User => {
                    const msg = "Successfully updated";
                    res.status(200).json({ msg });
                  })
              }
            )
            .catch(error => res.status(500).json(error));
        } else {
          // User not found
          res.status(404).json({ msg: `No account found` });
        }
      })
      // Server error
      .catch(error => {
        res.status(404).json({ error });
      });
  });
};
