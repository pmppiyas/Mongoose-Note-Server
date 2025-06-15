import express, { Application, Request, Response } from "express";
import noteRouter from "../Router/NoteRouter";

const app: Application = express();
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, World!");
});

app.use("/note", noteRouter);

export default app;
