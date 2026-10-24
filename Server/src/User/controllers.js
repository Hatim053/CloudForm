import User from "./model.js";
import RefreshToken from "../Auth/model.js";
import { generateAccessAndRefreshToken , accessCookieOptions , refreshCookieOptions } from "../Auth/controllers.js";
import oauth2client from "../Auth/config.js";

const Login = async (req , res) => {
    const { code } = req.query;
    console.log("code" , code);
    const googleRes = await  oauth2client.getToken(code);
    const tokens = googleRes.tokens;
    oauth2client.setCredentials(tokens);
    
    const access_token = tokens.access_token;
    const userRes = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`);
    
    const userInfo = await userRes.json();
    const { email , name : username, profileImage } = userInfo;
    
    const existingUser = await User.findOne({email : email});
    if(existingUser) {
        const {accessToken , refreshToken} = await generateAccessAndRefreshToken(existingUser);
        console.log("RefreshToken" , refreshToken);
      return res
             .status(201)
               .cookie('accessToken' , accessToken , accessCookieOptions)
               .cookie('refreshToken' , refreshToken , refreshCookieOptions)
             .json({
                status : 201,
                message : "user loggedin successfully",
                user : existingUser
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


const Logout = async(req , res) => {
const user = req?.user;
if(!user) {
    return res
           .status(404)
           .json({
            status : 404,
            message : "no user found"
           });
}
// revoking all the refresh tokens for the current user
const currentUserAllRefreshToken = await RefreshToken.updateMany(
    {user_id : user?._id},
    {
        $set : {
            revoked_at : new Date(Date.now())
        }
    }
);

return res
       .status(205)
       .clearCookie('refreshToken')
       .clearCookie('accessToken')
       .json({
        status : 205,
        message : "user logout successfully"
       });
       
};

export {
    Login,
    Logout
}
