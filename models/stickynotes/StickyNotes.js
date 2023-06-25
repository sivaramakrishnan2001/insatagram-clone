import mongoose, { Schema } from "mongoose";

const stickyNotesSchema = new Schema({
    title: String,
    song: {
        type: Schema.Types.ObjectId,
        ref: "Songs"
    },
    postedBy: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },

}, { timestamps: true });


export const StickyNotes = mongoose.model("StickyNotes", stickyNotesSchema);
