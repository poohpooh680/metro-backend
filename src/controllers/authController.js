const authService = require("../services/authService");




// REGISTER

const register = async(req,res,next)=>{

    try{

        const result =
        await authService.registerUser(
            req.body
        );


        res.status(201).json({

            message:"User created",

            ...result

        });



    }catch(error){

        next(error);

    }

};







// LOGIN

const login = async(req,res,next)=>{

    try{

        const {
            email,
            password
        } = req.body;



        const result =
        await authService.loginUser(
            email,
            password
        );



        res.json({

            message:"Login successful",

            ...result

        });



    }catch(error){

        next(error);

    }

};




module.exports = {
    register,
    login
};