import mongoose, { mongo } from 'mongoose';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        unique : true,
        required : true,
    },
    profileImage : {
        type : String,
    },
    role : {
        type : String,
        required : true,
        enum : ["user" , "admin"]
    },
} , { timestamps : true });


userSchema.methods.generateAccessToken = function() {
    return jwt.sign({
        _id : this._id,
        role : this.role,
    },
process.env.ACCESSTOKENSECRET,
{expiresIn : process.env.ACCESSTOKENEXPIRY})
};

const User = mongoose.model('User' , userSchema);

export default User;