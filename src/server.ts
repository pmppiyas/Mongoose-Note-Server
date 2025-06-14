import { Server } from "http";
import app from "./app";
import mongoose from "mongoose";

let server: Server;
const port = process.env.PORT || 3000;
async function main() {
  try {
    await mongoose.connect(
      "mongodb+srv://note_app_project:sgs6uUqf5I4reDaz@cluster0.fk8o9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );

    server = app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Error starting the server:", error);
    process.exit(1);
  }
}
main();
