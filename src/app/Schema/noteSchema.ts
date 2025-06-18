import mongoose, { Schema } from "mongoose";
import NoteInterface from "../Interfaces/noteInterface";
import { z } from "zod";

export const noteZod = z.object({
  title: z
    .string()
    .trim()
    .min(5, "Title must be minimum 5 characters.")
    .max(35, "Title must be upto 35 characters."),
  content: z
    .string()
    .trim()
    .min(5, "Content must be minimum 5 characters.")
    .max(1000, "Content name must be upto 1000 characters."),
  page: z.number().min(1, "Page number must be upper 1"),
});
const noteSchema = new Schema<NoteInterface>(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },

    page: {
      type: Number,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Note = mongoose.model("Note", noteSchema);

export default Note;
