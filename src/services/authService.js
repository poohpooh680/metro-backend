const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


// Register user
exports.registerUser = async (data) => {

    const {
        name,
        email,
        password
    } = data;


    const existingUser =
        await User.findOne({ email });


    if(existingUser){

        throw new Error("User already exists");

    }


    const hashedPassword =
        await bcrypt.hash(password,10);



    const user =
        await User.create({

            name,

            email,

            password: hashedPassword

        });



    const token =
        jwt.sign(

            {
                id:user._id
            },

            process.env.JWT_SECRET,

            {
                expiresIn:"7d"
            }

        );


    return {
        user,
        token
    };

};





// Login user
exports.loginUser = async (email,password)=>{


    const user =
        await User.findOne({email});


    if(!user){

        throw new Error("User not found");

    }



    const match =
        await bcrypt.compare(
            password,
            user.password
        );



    if(!match){

        throw new Error("Wrong password");

    }



    const token =
        jwt.sign(

            {
                id:user._id
            },

            process.env.JWT_SECRET,

            {
                expiresIn:"7d"
            }

        );


    return {
        user,
        token
    };


};