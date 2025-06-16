import express, { Request, Response, Router } from "express";
import Note from "../Schema/noteSchema";
const noteRouter: Router = express.Router();

//Create a Note
noteRouter.post("/create", async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const note = await Note.create(body);
    res.status(201).json({
      success: true,
      message: "Note created successfully",
      note: note,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create note" });
  }
});

// Get all Notes
noteRouter.get("/gets", async (req: Request, res: Response) => {
  try {
    const notes = await Note.find();

    if (notes.length === 0) {
      res.status(404).json({ message: "No notes found" });
    }

    res.status(200).json({ success: true, notes });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch notes" });
  }
});

// Get a Note by ID
noteRouter.get("/get/:id", async (req: Request, res: Response) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json({ success: true, note });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch note" });
  }
});

// Update a Note
noteRouter.patch("/update/:id", async (req: Request, res: Response) => {
  try {
    const noteId = req.params.id;
    const updateBody = req.body;
    const updatedNote = await Note.findByIdAndUpdate(noteId, updateBody, {
      new: true,
    });
    if (!updatedNote) {
      res.status(404).json({ message: "Updated data was not found" });
    }
    res.status(200).json({
      success: true,
      message: "Note updated successfully",
      note: updatedNote,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update note" });
  }
});

// Delete a Note
noteRouter.delete("/delete/:id", async (req: Request, res: Response) => {
  try {
    const noteId = req.params.id;
    const deletedNote = await Note.findByIdAndDelete(noteId);
    if (!deletedNote) {
      res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json({
      success: true,
      message: "Note deleted successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete note" });
  }
});
export default noteRouter;
