import mongoose, { Schema } from "mongoose";


const messageSchema = new Schema(
    {
        chatusers: {
            type: Array,
            require: true
        },
        message: {
            type: String,
            require: true
        },
        sender: {
            type: Schema.Types.ObjectId,
            require: true
        },
    },
    {
        timestamps: true,suppressReservedWarning: true
    }
);

export const MessageModel = mongoose.model("Message", messageSchema);