import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/connectDB.js";
import cul from "colors";
import cors from "cors";
import { errorHandler, notFound } from "./middleware/errorHandler.js";
import ToDoRoutes from "./routes/todoRoutes.js";

const app = express();
connectDB();
dotenv.config();
app.use(cors());
app.use(express.json());

app.use("/api/todo", ToDoRoutes);
app.use(notFound);
app.use(errorHandler);
app.listen(process.env.PORT || 2222, () => {
  console.log(`Server running on port ${process.env.PORT || 2222}`.yellow.bold);
});
