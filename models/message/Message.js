import mongoose, { Schema } from "mongoose";


const messageSchema = new Schema(
    {
        sender: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        conversation: {
            type: Schema.Types.ObjectId,
            ref: "Conversation"
        },
        content: Object,
        reels: {
            type: Schema.Types.ObjectId,
            ref: "Reels"
        },
        post: {
            type: Schema.Types.ObjectId,
            ref: "Post"
        }
    },
    {
        timestamps: true, suppressReservedWarning: true, suppressReservedKeysWarning: true
    }
);

export const Message = mongoose.model("Message", messageSchema);