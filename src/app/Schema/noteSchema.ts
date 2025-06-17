import mongoose, { Schema } from "mongoose";
import NoteInterface from "../Interfaces/noteInterface";

const noteSchema = new Schema<NoteInterface>(
  {
    title: { type: String, required: true },
    content: String,
    page: { type: Number, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Note = mongoose.model("Note", noteSchema);

export default Note;
