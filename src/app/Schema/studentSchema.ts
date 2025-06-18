import mongoose, { Schema } from "mongoose";
import StudentInterface, { addressInterface } from "../Interfaces/studentInterface";
import { z } from "zod";

const addressZOd = z.object({
  city: z.string().min(2, { message: "City name must be at least 2 characters." }),
  street: z.string().min(3, { message: "Street name must be at least 3 characters." }),
  zip: z
    .number()
    .int()
    .min(1000)
    .max(9999)
    .or(z.string().regex(/^\d{5}$/))
    .refine(
      (val) =>
        (typeof val === "number" && val >= 1000 && val <= 9999) ||
        (typeof val === "string" && /^\d{4}$/.test(val)),
      { message: "Zip must be a valid 4-digit number." }
    ),
});

export const studentZod = z.object({
  firstName: z
    .string()
    .min(2, "First name must be minimum 2 characters.")
    .max(15, "First name must be upto 15 characters."),
  lastName: z
    .string()
    .min(3, "Last name must be minimum 3 characters.")
    .max(15, "Last name must be upto 15 characters."),
  class: z.string(),
  section: z.enum(["A", "B", "C"]).default("A"),
  rollNo: z.number().int(),
  phone: z.number().int(),
  email: z
    .string()
    .email({ message: "Invalid email format." })
    .regex(/^[a-zA-Z0-9._%+-]+@gmail\.com$/, {
      message: "Only Gmail addresses are allowed.",
    })
    .refine((val) => val.length > 0, { message: "Email is required." }),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long.")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/, {
      message:
        "Password must contain at least one uppercase letter, one lowercase letter, and one number.",
    }),
  birthDate: z
    .string()
    .transform((val) => new Date(val))
    .refine(
      (date) =>
        date instanceof Date && !isNaN(date.getTime()) && date <= new Date(),
      {
        message: "Birth date must be a valid date and cannot be in the future.",
      }
    )
    .optional(),

  address: addressZOd,
});



const addressSchema = new Schema<addressInterface>({
  city: String,
  street: String,
  zip: Number,

}, {
  _id: false
})

const studentSchema = new Schema<StudentInterface>(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    class: {
      type: Number,
      required: true,
      enum: {
        values: [-2, -1, 1, 2, 3, 4, 5],
        message: "Input only: -2, -1, 1, 2, 3, 4, or 5.",
      },
    },
    section: {
      type: String,
      default: "A",
    },
    rollNo: {
      type: Number,
      required: true,
      unique: true,
    },
    phone: { type: Number, required: true, unique: false },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      // validate: {
      //   validator: function (v: string) {
      //     return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
      //   },
      //   message: function (props: { value: string }) {
      //     return `${props.value} is not a valid email address!`;
      //   },
      // },
    },
    password: {
      type: String,
      required: true,
      minlength: [6, "Password must be at least 6 characters long."],
      // validate: {
      //   validator: function (v: string) {
      //     return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/.test(v);
      //   },
      //   message: function (props: { value: string }) {
      //     return `${props.value} must contain at least one uppercase letter, one lowercase letter, and one number.`;
      //   },
      // },
    },
    birthDate: {
      type: Date,
      // validate: {
      //   validator: function (v: Date) {
      //     return v ? v <= new Date() : true;
      //   },
      //   message: function (props: { value: Date }) {
      //     return `Birth date ${props.value} cannot be in the future.`;
      //   },
      // },
    },
    address: {
      type: addressSchema,
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
