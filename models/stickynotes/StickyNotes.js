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

}, { timestamps: true, supressReservedKeysWarning: true });


export const StickyNotes = mongoose.model("StickyNotes", stickyNotesSchema);
