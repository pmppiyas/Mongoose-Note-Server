import express, { Application, Request, Response } from "express";
import noteRouter from "./app/Router/NoteRouter";
import studentRouter from "./app/Router/StudentRouter";

const app: Application = express();
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello Academy!");
});

app.use("/note", noteRouter);

app.use("/student", studentRouter);

export default app;
