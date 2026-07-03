import { app } from './app.js';
import { connectDb } from './src/DB/index.js';

const PORT = process.env.PORT;



// connecting with database
const connectionString = process.env.MONGODB_CONNECTION_STRING;
console.log(`Mongo URI:${process.env.MONGODB_CONNECTION_STRING}`);

connectDb(connectionString)
.then((connectionInstance) => {
    console.log('DataBase connection successful');
    // after successful connection to db starting server
    app.listen(PORT , () => {
    console.log('server is listening on port' , PORT);
});
})
.catch((err) => {
    console.log('DataBase connection failed' , err);
});
