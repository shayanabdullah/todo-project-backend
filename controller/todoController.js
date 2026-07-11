const todoModel = require("../model/todoModel");

const createTodo = async (req, res) => {
try {
    const { title, description, priority, status, category } = req.body;
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
    status: status || 'pending',
    category: category || 'other',
    path: req.file ? req.file.path : null,
    filetype: req.file ? req.file.mimetype : null,
  });
  

  todo.save();
  res.send({
    success: true,
    message: "todo created",
  });
}
catch (error) {
  console.error(error);
  res.status(500).json({
    success: false,
    message: error.message,
  });
}
}
const deleteTodo = async (req, res) => {
  const todo = await todoModel.findByIdAndDelete(req.params.id);
  res.send({
    success: true,
    message: "todo deleted",
  });
};


const editTodo = async (req, res) => {
  try {

    if(req.file){
      req.body.path = req.file.path;
      req.body.filetype = req.file.mimetype;
    }

await todoModel.findByIdAndUpdate(req.params.id, req.body);

    res.send({
      success: true,
      message: "Todo edited",
    });
  } catch (error) {
    console.error(error);
   
  }
};
const getAllTasks = async (req, res) => {
  const todos =  await todoModel.find({});
  res.send({
    success: true,
    todos: todos,
  });
}


module.exports = { createTodo, deleteTodo, editTodo, getAllTasks };
