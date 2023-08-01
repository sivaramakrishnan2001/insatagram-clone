import mongoose, { Schema } from "mongoose";

const chatSchema = new Schema({
    members: {
        type: Array
    },
    profile: {
        type: String
    },
    lastMessage: String

}, { timestamps: true, suppressReservedWarning: true, suppressReservedKeysWarning: true });

export const ChatSchema = mongoose.model("Chat", chatSchema);