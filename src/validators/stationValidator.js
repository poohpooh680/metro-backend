const { body } = require("express-validator");


exports.stationValidation = [

    body("name")
    .notEmpty()
    .withMessage("Station name required"),


    body("line")
    .notEmpty()
    .withMessage("Line required")

];