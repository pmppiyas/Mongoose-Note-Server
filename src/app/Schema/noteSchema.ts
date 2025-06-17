import mongoose, { Schema } from "mongoose";
import NoteInterface from "../Interfaces/noteInterface";

const noteSchema = new Schema<NoteInterface>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: [100, "Title must be at most 100 characters long."],
      minlength: [5, "Title must be at least 5 characters long."],
    },
    content: {
      type: String,
      required: true,
      minlength: [10, "Content must be at least 10 characters long."],
      maxlength: [1000, "Content must be at most 1000 characters long."],
    },

    page: {
      type: Number,
      required: true,
      min: [1, "Page number must be at least 1."],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Note = mongoose.model("Note", noteSchema);

export default Note;
