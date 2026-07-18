import oauth2client from "./config.js";
import RefreshToken from "./model.js";
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from "uuid";


const accessCookieOptions = {
    httpOnly : true,
    secure : true,
    sameSite : "strict"
};

const refreshCookieOptions = {
    httpOnly : true,
    secure : true,
    sameSite : "strict",
    path : "/auth/refresh"
};

const generateRefreshToken = (user) => {
    const uid = uuidv4();
    const refreshToken =  jwt.sign({
        _id : user._id,
        uid : uid
    },
    process.env.REFRESHTOKENSECRET,
    {expiresIn : process.env.REFRESHTOKENEXPIRY})

    return {refreshToken , uid};
    
};

const generateAccessToken = (user) => {
    return jwt.sign({
        _id : this._id,
        role : this.role
    },
process.env.ACCESSTOKENSECRET,
{expiresIn : process.env.ACCESSTOKENEXPIRY})
};

const generateAccessAndRefreshToken = async (user) => {
    const accessToken = generateAccessToken(user);
    const { refreshToken , uid } = generateRefreshToken(user);
    const refreshTokenDocument = await RefreshToken.create({
        user_id : user._id,
        token : refreshToken,
        uid : uid,
        revoked_at : null,
        expires_at : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    return { accessToken , refreshToken };
};



const renewAccessToken = async(req , res) => {
    const user = req?.user;
    const refreshToken = req?.cookies?.refreshToken;
    if(!refreshToken) {
        return res
        .status(405)
        .json({
            status : 405,
            message : "refresh token not found"
        })
    }
    // check if the refresh token is revoked or valid
    const isRefreshTokenRevoked =  await RefreshToken.findOne({token : refreshToken});
    if(isRefreshTokenRevoked.revoked_at) {
        // means getting request from a revoked token 
        // revoking all the tokens for the user and making force logout
        const currentUserAllRefreshToken = await RefreshToken.updateMany(
            {user_id : user?._id},
            {
                $set : {
                    revoked_at : new Date(Date.now())
                }
            }
        );
               
        return res
               .status(408)
               .clearCookie('refreshToken')
               .json({
                status : 408,
                message : "refresh token is revoked",
                warning : "force logout user"
               });
    }
    try {
        const decodedToken = jwt.verify(refreshToken , process.env.REFRESHTOKENSECRET);
        const user = await User.findById(decodedToken._id);
        if(! user) {
        return res.json({
        status : 401,
        message : 'no such user exist'
    }) // redirect user for signup on frontend
}
        const accessToken = generateAccessToken(user);
        return res
         .status(201)
         .cookie("accessToken" , accessToken , accessCookieOptions)
         .json({
            status : 201,
            message : "access token renewed successfully"
         })
    } catch (err) {
        if(err.name === "TokenExpiredError") {
          return res
          .status(404)
          .json({
            status : 404,
            message : "refresh token expired"
          })
        }
        if(err.name === "JsonWebTokenError") {
            // invalid token
            return res
            .status(406)
            .json({
                status : 406,
                message : "invalid refresh token"
            })
        }
    }


};

export {
renewAccessToken,
generateAccessAndRefreshToken,
accessCookieOptions,
refreshCookieOptions
};