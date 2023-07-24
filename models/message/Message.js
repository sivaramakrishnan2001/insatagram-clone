import mongoose, { Schema } from "mongoose";


const messageSchema = new Schema(
    {
        sender: {
            type: Schema.Types.ObjectId,
            ref:"User"
        },
        conversation: {
            type: Schema.Types.ObjectId,
            ref:"Conversation"
        },
        content: {
            text: String,
            imgUrl: String,
            videoUrl: String,
            file: String,
            filename: String,
            type: String,
        },
    },
    {
        timestamps: true,suppressReservedWarning: true
    }
);

export const Message = mongoose.model("Message", messageSchema);