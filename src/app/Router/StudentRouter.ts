import express, { Request, Response, Router } from "express";
import { Student } from "../Schema/studentSchema";
const studentRouter: Router = express.Router();

// Create a Student
studentRouter.post("/create", async (req: Request, res: Response) => {
  try {
    const body = req.body;
    console.log("Received body:", body);
    const student = await Student.create(body);
    res.status(201).json({
      success: true,
      message: "Student admitted successfully",
      student: student,
    });
  } catch (err) {
    // console.error(err);
    res.status(500).json({ err });
  }
});

// Get all Students
studentRouter.get("/gets", async (req: Request, res: Response) => {
  try {
    const students = await Student.find();
    if (students.length === 0) {
      res.status(404).json({ message: "No students found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch students" });
  }
});

// Get a Student
studentRouter.get("/get/:id", async (req: Request, res: Response) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json({ success: true, student });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch student" });
  }
});

// Update a Student
studentRouter.patch("/update/:id", async (req: Request, res: Response) => {
  try {
    const studnetId = req.params.id;
    const updateBody = req.body;
    const updateStudent = await Student.findByIdAndUpdate(
      studnetId,
      updateBody,
      {
        new: true,
      }
    );
    res.status(200).json({
      success: true,
      message: "Student updated successfully",
      student: updateStudent,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update student" });
  }
});

// Delete a Student
studentRouter.delete("/delete/:id", async (req: Request, res: Response) => {
  try {
    const studentId = req.params.id;
    const deletedStudent = await Student.findByIdAndDelete(studentId);
    if (!deletedStudent) {
      res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json({
      success: true,
      message: "Student deleted successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete student" });
  }
});

export default studentRouter;
