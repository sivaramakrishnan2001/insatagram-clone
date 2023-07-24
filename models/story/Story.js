import mongoose, { Schema } from "mongoose";

const StorySchema = new Schema({
    url: String,
    song: {},
    filename: String,
    type: String,
    location: String,
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
    viewers: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ],
}, { timestamps: true ,suppressReservedWarning: true});


export const STORY = mongoose.model("Story", StorySchema);


