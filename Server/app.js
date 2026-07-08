import express , {urlencoded} from 'express';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRoutes from './src/GoogleAuth/routes.js';
import formElementsRoutes from './src/FormElements/routes.js';

const app = express();
const corsOptions = {
    origin : process.env.CLIENT_ENDPOINT,
    methods : ['GET' , 'POST'],
    credentials : true  
};

// middleware setup
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded( {extended : true , limit : '5mb'} ));


app.use("/auth" , authRoutes);
app.use("/createFormElement" , formElementsRoutes);



export {
    app
}