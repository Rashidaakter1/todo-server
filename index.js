const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

app.use(bodyParser.json());
app.use(cors());

const port = 5000;
mongoose.connect(
  "mongodb+srv://rashidaakterchadni:3WH3NZaCSsF37tKR@cluster0.7w4lp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
);

const TodoSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  task: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },

  priority: {
    type: String,
    enum: ["high", "medium", "low"],
    required: true,
  },

  isCompleted: { type: Boolean, default: false, required: false },
});

const Todo = mongoose.model("Todo", TodoSchema);

app.get("/todos", async (req, res) => {
  const query = req.query;
  const todos = await Todo.find(query);
  res.status(200).json({
    success: true,
    message: "Todo retrieved successfully",
    data: todos,
  });
});

app.post("/todos", async (req, res) => {
  const newTodo = await Todo.create(req.body);
  res.status(200).json({
    isSuccess: true,
    message: "Todo created successfully",
    data: newTodo,
  });
});

app.delete("/todo/:id", async (req, res) => {
  const todo = await Todo.findOneAndDelete({ id: req.params.id });
  res.status(200).json({
    isSuccess: true,
    message: "Todo is deleted successfully",
    data: todo,
  });
});

app.put("/todo/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const updatedTodo = await Todo.findOneAndUpdate(
    { id: id },
    {
      task: req.body.task,
      isCompleted: req.body.isCompleted,
      description: req.body.description,
      priority: req.body.priority,
    },
    { new: true }
  );
  res.status(200).json({
    isSuccess: true,
    message: "Todo is updated successfully",
    data: updatedTodo,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
