const { body } = require("express-validator");
const mongoose = require("mongoose");


exports.announcementValidation = [

    body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required"),



    body("message")
    .trim()
    .notEmpty()
    .withMessage("Message is required"),



    body("station")
    .notEmpty()
    .withMessage("Station ID is required")

    .custom((value)=>{

        if(!mongoose.Types.ObjectId.isValid(value)){

            throw new Error(
                "Invalid station ID"
            );

        }


        return true;

    })

];