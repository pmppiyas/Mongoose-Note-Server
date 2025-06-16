import mongoose, { Schema } from "mongoose";

const noteSchema = new Schema(
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
