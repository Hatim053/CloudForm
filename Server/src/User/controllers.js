import User from "./model.js";
import { generateAccessAndRefreshToken , accessCookieOptions , refreshCookieOptions } from "../Auth/controllers.js";


const Signup = async (req , res) => {
    const { code } = req.query;
    
    const googleRes = await  oauth2client.getToken(code);
    const tokens = googleRes.tokens;
    oauth2client.setCredentials(tokens);
    
    const access_token = tokens.access_token;
    const userRes = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`);
    
    const userInfo = await userRes.json();
    const { email , name : username, profileImage } = userInfo;
    
    const existingUser = await User.find({email : email});
    if(existingUser) {
        return res.
        status(405).
        json({
            status : 405,
            message : "user already exist",
        });
    }
    const newUser = await User.create({
        username : username,
        email : email,
        profileImage : profileImage ? profileImage : null,
        role : "user"
    })
    
    const {accessToken , refreshToken} = await generateAccessAndRefreshToken(newUser);
    
    return res
    .status(500)
    .cookie('accessToken' , accessToken , accessCookieOptions)
    .cookie('refreshToken' , refreshToken , refreshCookieOptions)
    .json({
        status : 500,
        message : "user registered successfully",
        username : username,
        profileImage : profileImage
    })
};


const Login = async(req , res) => {
const { code } = req.query;

const googleRes = await oauth2client.getToken(code);
const tokens = googleRes.tokens;
oauth2client.setCredentials(tokens);

const access_token = tokens.access_token;
const userRes = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`);

const userInfo = await userRes.json();
const { email , username : username , profileImage } = userInfo;

const existingUser = await User.find({email : email});
if(!existingUser) {
    return res
           .status(407)
           .json({
            status : 407,
            message : "user doesn't exist in the database"
           });
}
const {accessToken , refreshToken} = await generateAccessAndRefreshToken(existingUser);

      return res
             .status(201)
               .cookie('accessToken' , accessToken , accessCookieOptions)
               .cookie('refreshToken' , refreshToken , refreshCookieOptions)
             .json({
                status : 201,
                message : "user loggedin successfully",
                user : existingUser
             });

};


const Logout = async(req , res) => {

};

export {
    Signup,
    Login
}
