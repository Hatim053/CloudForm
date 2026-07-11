import jwt from "jsonwebtoken";
import User from "../User/model.js"

const authenticateUser =  function(req , res , next) {

const accessToken = req.cookies?.accessToken;
if(! accessToken) {
    return res.json({
        status : 404,
        message : 'access token not found'
    }) // redirect user for login on frontend
}

try {
    const decodedToken = jwt.verify(accessToken , process.env.ACCESSTOKENSECRET);
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
} catch (err) {
    if(err.name === "TokenExpiredError") {
          return res
          .status(404)
          .json({
            status : 408,
            message : "access token expired"
          })
        }
        if(err.name === "JsonWebTokenError") {
            // invalid token
            return res
            .status(406)
            .json({
                status : 406,
                message : "invalid access token"
            })
        }
}

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