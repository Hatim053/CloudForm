import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const authenticateUser = async function(req , res , next) {

const token = req.cookies?.accessToken;
if(! token) {
    return res.json({
        status : 404,
        message : 'access token not found'
    }) // redirect user for login on frontend
}
const decodedToken = jwt.verify(token , process.env.ACCESSTOKENSECRET);
if(! decodedToken) {
    return res.json({
        status : 404,
        message : 'access token expired'
    }) // redirect user for login on frontend
}
const user = await User.findById(decodedToken._id).select("username email");
if(! user) {
    return res.json({
        status : 401,
        message : 'no such user exist'
    }) // redirect user for signup on frontend
}
req.user = user;
next();
};

export default authenticateUser;