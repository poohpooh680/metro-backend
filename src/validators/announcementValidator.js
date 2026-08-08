const { body } = require("express-validator");


exports.announcementValidation = [

    body("title")
    .notEmpty()
    .withMessage("Title required"),


    body("message")
    .notEmpty()
    .withMessage("Message required"),


    body("station")
    .notEmpty()
    .withMessage("Station ID required")

];