import express, { Request, Response, Router } from "express";
import Note from "../Schema/noteSchema";
const noteRouter: Router = express.Router();

noteRouter.post("/create-note", async (req: Request, res: Response) => {
  try {
    const myNote = new Note({
      title: req.body.title,
      content: req.body.content,
    });
    if (!myNote.title) {
      return res.status(400).json({ error: "Title is required" });
    }
    await myNote.save().then((note) => {
      return res.status(201).json({
        success: true,
        message: "Note created successfully",
        note: note,
      });
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to create note" });
  }
});

export default noteRouter;
