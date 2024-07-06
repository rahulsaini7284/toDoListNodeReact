import {
  getAllToDo,
  createToDo,
  getSingleToDo,
  deleteToDo,
  updateToDo,
} from "../controllers/todoController.js";
import express from "express";

const ToDoRoutes = express.Router();

ToDoRoutes.post("/create", createToDo);
ToDoRoutes.get("/getAll", getAllToDo);
ToDoRoutes.get("/get/:id", getSingleToDo);
ToDoRoutes.delete("/delete/:id", deleteToDo);
ToDoRoutes.put("/update/:id", updateToDo);

export default ToDoRoutes;
