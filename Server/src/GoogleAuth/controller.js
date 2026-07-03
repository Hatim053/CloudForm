import oauth2client from './config.js';

const login = async (req , res) => {
    const { code } = req.query;
    
    const googleRes = await  oauth2client.getToken(code);
    const tokens = googleRes.tokens;
    oauth2client.setCredentials(tokens);
    
    const access_token = tokens.access_token;
    const userRes = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`);
    
    const userInfo = await userRes.json();
    const { email , name , profileImage } = userInfo;
};


export {
login,
};