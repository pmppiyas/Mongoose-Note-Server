import express, { Request, Response, Router } from "express";
import Note from "../Schema/noteSchema";
const noteRouter: Router = express.Router();

noteRouter.post("/create", async (req: Request, res: Response) => {
  try {
    const myNote = new Note({
      title: req.body.title,
      content: req.body.content,
      page: req.body.page,
      createdAt: req.body.createdAt || new Date(),
    });
    if (!myNote.title) {
      res.status(400).json({ error: "Title is required" });
    }
    if (!myNote.page) {
      res.status(400).json({ error: "Page is required" });
    }
    await myNote.save().then((note) => {
      res.status(201).json({
        success: true,
        message: "Note created successfully",
        note: note,
      });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create note" });
  }
});

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

export default noteRouter;
