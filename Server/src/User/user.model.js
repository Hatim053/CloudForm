import mongoose, { mongo } from 'mongoose';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        lowercase : true
    },
    email : {
        type : String,
        required : true,
    },
    userCreatedForms : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Liveform'
    }],
} , { timestamps : true });


userSchema.methods.generateAccessToken = function() {
    return jwt.sign({
        _id : this._id,
        username : this.username,
    },
process.env.ACCESSTOKENSECRET,
{expiresIn : process.env.ACCESSTOKENEXPIRY})
};

const User = mongoose.model('User' , userSchema);

export default User;