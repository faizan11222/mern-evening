const jwt = require('jsonwebtoken');
const User = require('../models/user');

const protect = async(req,res,next) => {
    /*
    step 1: get the token from header
    step 2: verify the token
    step 3: get the user from the token
    step 4: if user not found then return error
    step 5: if user found then pass the user to
    */

    //step 1: get the token from header
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(401).json({
            success:false,
            message:'Unauthorized! No token provided'
        })
    }
    //removing the 'Bearer ' from the token
    const token = authHeader.split(' ')[1];

    try{
        //step 2: verify the token
        const decoded = jwt.verify(token,process.env.JWT_SECRET);

        //step 3: get the user from the token
        req.user = await User.findById(decoded.id).select('-password');

        //step 4: if user not found then return error
        if(!req.user){
            return res.status(401).json({
                success:false,
                message:'Unauthorized! User not found'
            })
        }
        next();
}catch(error){
    return res.status(401).json({
        success:false,
        message:'Unauthorized! Invalid token'
    })
}
}

module.exports = {protect}