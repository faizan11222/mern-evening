const User = require('../models/user');
const jwt = require('jsonwebtoken');

//registering jwt here
const signToken = (id) => 
jwt.sign({id},process.env.JWT_SECRET,{
expiresIn:process.env.JWT_EXPIRES_IN
})

//API for register
const register = async (req,res) => {
    try{
        const {name,email,password} = req.body;

        //validation
        if(!name || !email || !password){
            return res.status(400).json({success:false, message:'please enter the required fields'})
        }

        //check if the email already exists or not into database
    }catch(error){

    }
}