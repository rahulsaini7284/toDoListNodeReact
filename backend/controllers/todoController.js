import ToDo from "../models/Todo.js";
import asyncHandler from "express-async-handler";

export const createToDo = asyncHandler(async (req, res) => {
  const { title, description, status, dueDate } = req.body;
  let date = new Date(dueDate);
  if (date.getTime() > new Date().getTime()) {
    const data = await ToDo.create({ title, description, status, dueDate });
    if (data) {
      res.status(201).send(data);
    } else {
      res.status(400);
      throw new Error("ToDo not created");
    }
  } else {
    res.status(400);
    throw new Error("Please Enter Valid Date");
  }
});

export const getAllToDo = asyncHandler(async (req, res) => {
  const data = await ToDo.find();
  const total = await ToDo.find().count();

  res.status(200).send({ total, data });
});

export const getSingleToDo = asyncHandler(async (req, res) => {
  const data = await ToDo.findById(req.params.id);
  if (data) {
    res.status(200).send(data);
  } else {
    res.status(400);
    throw new Error("This ToDo item not found");
  }
});

export const deleteToDo = asyncHandler(async (req, res) => {
  const data = await ToDo.findByIdAndDelete(req.params.id);
  if (data) {
    res.status(200).send({ message: "Deleted Successfully" });
  } else {
    res.status(400);
    throw new Error("This ToDo item not found and not deleted");
  }
});

export const updateToDo = asyncHandler(async (req, res) => {
  const data = await ToDo.findById(req.params.id);
  let date = new Date(req.body.dueDate);
  if (date.getTime() > new Date().getTime()) {
    if (data) {
      data.title = req.body.title || data.title;
      data.description = req.body.description || data.description;
      data.status = req.body.status === true ? true : false;
      data.dueDate = req.body.dueDate || data.dueDate;
    }
    const updatedTodo = await data.save();
    if (updatedTodo) {
      res.status(200).send(updatedTodo);
    } else {
      res.status(400);
      throw new Error("This ToDo item not found and not updated");
    }
  } else {
    res.status(400);
    throw new Error("Please Enter Valid Date");
  }
});
