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
        const existingUser = await User.findOne({email})
        if(existingUser){
            return res.status(400).json({
                success:false,
                message:'Email already exists!'
            })
        }
        //else register user into database
        const user = await User.create({name,email,password})
        //generating the token with registeration
        const token = signToken(user._id);

        res.status(201).json({
            success:true,
            message:'Account created successfully!',
            token,
            user:{id: user._id, name:user.name,email:user.email, role:user.role}
        })
    }catch(error){
            res.status(500).json({
            success:false,
            message:'Something went wrong!',
            })
    }
}
module.exports = {register};