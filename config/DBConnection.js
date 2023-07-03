import mongoose from "mongoose";

// ==================================================================

export const DBConnection = async () => {
    try {
        mongoose.set('strictQuery', false);
        const url = `mongodb://${process.env.USER_NAME}:${process.env.PASSWORD}@ac-fp7chwi-shard-00-00.mlfrbwg.mongodb.net:27017,ac-fp7chwi-shard-00-01.mlfrbwg.mongodb.net:27017,ac-fp7chwi-shard-00-02.mlfrbwg.mongodb.net:27017/instagram?ssl=true&replicaSet=atlas-4z2z9e-shard-0&authSource=admin&retryWrites=true&w=majorityF`;
        console.log("url",url);
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("database connected...");
    } catch (error) {
        console.log("error database disconnected...", error);
    }
}