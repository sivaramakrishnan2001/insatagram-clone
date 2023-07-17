import mongoose, { Schema } from "mongoose";


const ConversationSchema = new Schema(
    {
        participants: [
            {
                user: {
                    type: Schema.Types.ObjectId,
                    ref: "User",
                },
                id: String,
            },
            {
                user: {
                    type: Schema.Types.ObjectId,
                    ref: "User",
                },
                id: String,
            },
        ],
    },
    {
        timestamps: true
    }
);

export const Conversation = mongoose.model("Conversation", ConversationSchema);