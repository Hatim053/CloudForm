import jwt from "jsonwebtoken";
import User from "../User/model.js"

const authenticateUser =  function(req , res , next) {

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
const user = {
    _id : decodedToken._id,
    role : decodedToken.role
};

if(! user) {
    return res.json({
        status : 401,
        message : 'no such user exist'
    }) // redirect user for signup on frontend
}
req.user = user;
next();
};


const requieAdmin = function(req , res , next) {
    const role = req?.user?.role;
    if(role !== "admin") {
        return res
        .status(405)
        .json({
            status : 405,
            message : "restricted routes",
        });
    } 
    next();
};

export {
    authenticateUser,
    requieAdmin
};