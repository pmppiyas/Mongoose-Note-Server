import mongoose, { Schema } from "mongoose";
import StudentInterface from "../Interfaces/studentInterface";

const studentSchema = new Schema<StudentInterface>(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minlength: [2, "First name must be minimum 2 charecters."],
      maxlength: [15, "First name must be upto 15 characters."],
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      minlength: [2, "Last name must be minimum 2 characters."],
      maxlength: [15, "Last name must be upto 15 characters."],
    },
    class: {
      type: Number,
      required: true,
      enum: {
        values: [-2, -1, 1, 2, 3, 4, 5],
        message:
          "Class must be one of the following: -2, -1, 1, 2, 3, 4, or 5.",
      },
    },
    section: { type: String, enum: ["A", "B", "C"], required: true },
    rollNo: { type: Number, required: true, unique: true, min: 1 },
    phone: { type: Number, required: true, unique: false },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: function (v: string) {
          return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
        },
        message: function (props: { value: string }) {
          return `${props.value} is not a valid email address!`;
        },
      },
    },
    password: {
      type: String,
      required: true,
      minlength: [6, "Password must be at least 6 characters long."],
      validate: {
        validator: function (v: string) {
          return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/.test(v);
        },
        message: function (props: { value: string }) {
          return `${props.value} must contain at least one uppercase letter, one lowercase letter, and one number.`;
        },
      },
    },
    birthDate: {
      type: Date,
      default: null,
      validate: {
        validator: function (v: Date) {
          return v ? v <= new Date() : true;
        },
        message: function (props: { value: Date }) {
          return `Birth date ${props.value} cannot be in the future.`;
        },
      },
    },
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
