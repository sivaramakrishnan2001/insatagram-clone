import mongoose, { Schema } from "mongoose";


const postSchema = new Schema({

    title: {
        type: String,
    },

    body: {
        type: String,
    },

    photo: String,

    song: {},

    filename: String,

    location: String,

    save: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ],

    likes: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ],

    postedBy: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },

    comments: [
        {
            text: String,
            postedBy: {
                type: Schema.Types.ObjectId,
                ref: "User"
            }
        }
    ],

}, { timestamps: true });

export const POST = mongoose.model("Post", postSchema);

