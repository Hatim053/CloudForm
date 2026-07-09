import { app } from './app.js';
import { connectDb } from './src/DB/index.js';
import seedAdmin from './src/Admin/admin.js';

const PORT = process.env.PORT;



// connecting with database
const connectionString = process.env.MONGODB_CONNECTION_STRING;


const startServer = async() => {
    try {
        const connectionInstance = await connectDb(connectionString);
        console.log('DataBase connection successful');

        await seedAdmin();
        
        app.listen(PORT , () => {
        console.log('server is listening on port' , PORT);
        });
    } catch (error) {
        console.log(error);
    }
};

startServer();