const todoModel = require("../model/todoModel");

const createTodo = async (req, res) => {
  const { title, description, priority } = req.body;
  if (!title || !description) {
    return res.send({
      success: false,
      message: "please fill the all fields",
    });
  }
  const todo = await todoModel({
    title: title,
    description: description,
    priority: priority,
    path: req.file ? req.file.path : null,
    filetype: req.file ? req.file.mimetype : null,
  });
  

  todo.save();
  res.send({
    success: true,
    message: "todo created",
  });
};

const deleteTodo = async (req, res) => {
  const todo = await todoModel.findByIdAndDelete(req.params.id);
  res.send({
    success: true,
    message: "todo deleted",
  });
};


const editTodo = async (req, res) => {
  const todo = await todoModel.findByIdAndUpdate(req.params.id, req.body);
  res.send({
    success: true,
    message: "todo edited",
  });
};



module.exports = { createTodo, deleteTodo, editTodo };
