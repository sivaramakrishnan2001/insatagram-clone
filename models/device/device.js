import mongoose, { Schema } from "mongoose";

const DeviceSchema = new Schema({
    postedBy: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    devicetoken: String
}, { timestamps: true ,suppressReservedWarning: true});


export const DeviceToken = mongoose.model("device", DeviceSchema);


