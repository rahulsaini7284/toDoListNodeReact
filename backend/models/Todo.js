import { timeStamp } from "console";
import mongoose from "mongoose";
const toDoSachema = mongoose.Schema(
  {
    title: { type: String, reqired: true },
    description: { type: String, reqired: true },
    status: { type: Boolean, default: false },
    dueDate: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
const ToDo = mongoose.model("todo", toDoSachema);
export default ToDo;
