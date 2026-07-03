import mongoose from "mongoose";



async function connectDb(connectionString) {
    try {
    const connectionInstance = await mongoose.connect(connectionString);
     return connectionInstance;
    } catch (err) {
       throw err;

    }
};

export {
    connectDb
}