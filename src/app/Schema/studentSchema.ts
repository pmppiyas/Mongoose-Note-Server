import mongoose, { Schema } from "mongoose";
import StudentInterface from "../Interfaces/studentInterface";

const studentSchema = new Schema<StudentInterface>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    class: { type: Number, required: true },
    section: { type: String, enum: ["A", "B", "C"], required: true },
    rollNo: { type: Number, required: true, unique: true },
    phone: { type: Number, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    birthDate: { type: Date, default: null },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const Student = mongoose.model<StudentInterface>(
  "Student",
  studentSchema
);
