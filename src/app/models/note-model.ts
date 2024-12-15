import { Schema, model, models } from "mongoose";

const noteSchema = new Schema({
    note_author: {
        type: Object,
        require: true,
    },
    note_name: {
        type: String,
        require: true
    },
    note_content: {
        type: Object,
        require: true
    }
}, { timestamps: true })

const NoteModel = models.note || model('note', noteSchema);

export default NoteModel;