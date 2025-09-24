import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
}, { timestamps: true })

const Note = mongoose.models.Note || mongoose.model('Note', NoteSchema);

export default Note;