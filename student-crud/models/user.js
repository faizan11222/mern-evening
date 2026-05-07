const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:[true,'please enter name'],
        minlength:[3,'please enter name at least 2 characters long']
    },
    email:{
        type:String,
        trim:true,
        unique:true,
        lowercase:true,
        required:[true,'please enter your email']
    },
    password:{
        type:String,
        required:[true,'please enter password'],
        minlength:[6,'please enter password at least 6 characters long'],
        select:false
    },
    role:{
        type:String,
        enum:['admin','user'],
        default:'user'
    }

},{timestamps:true})


//pre saving the hash password before saving into database
userSchema.pre('save', async function(){
    //skip hashing if password field was not changed
    if(!this.isModified('password')) return

    //generating salt data for password so 2 identical passwords do not get same hash
    const salt = await bcrypt.genSalt(10)

    //now hashing the password along with salt
    this.password = await bcrypt.hash(this.password,salt)
})

//compare the entered password vs stored hash password
userSchema.methods.matchPassword = async function (enteredPassword) {
return await bcrypt.compare(enteredPassword,this.password)
}

module.exports = mongoose.model('User',userSchema);