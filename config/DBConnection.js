import mongoose from "mongoose";

// ==================================================================

export const DBConnection = () => {
    
    try {
        mongoose.set('strictQuery', false);
        const url = 'mongodb://siva:siva@ac-fp7chwi-shard-00-00.mlfrbwg.mongodb.net:27017,ac-fp7chwi-shard-00-01.mlfrbwg.mongodb.net:27017,ac-fp7chwi-shard-00-02.mlfrbwg.mongodb.net:27017/instagram?ssl=true&replicaSet=atlas-4z2z9e-shard-0&authSource=admin&retryWrites=true&w=majority'
        mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },);
        console.log("database connected...");
    } catch (error) {
        console.log("error database disconnected...", error);
    }
}