import mongoose, { mongo } from "mongoose";

const refreshTokenSchema = new mongoose.Schema({
    token : {
        type : String,
        required : true
    },
    uid : {
        type : String,
        required : true
    },
    revoked_at : {
        type : String,
        required : true
    },
    expires_at : {
        type : Date,
        required : true
    }
} , {timestamps : true} );


const RefreshToken = mongoose.model("RefreshToken" , refreshTokenSchema);

export default RefreshToken;