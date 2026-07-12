const todoModel = require("../model/todoModel");

const createTodo = async (req, res) => {
  try {
    const { title, description, priority, status, category } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the fields",
      });
    }

    const todo = new todoModel({
      title,
      description,
      priority,
      status: status || "pending",
      category: category || "other",
      path: req.file ? req.file.path : null,
      filetype: req.file ? req.file.mimetype : null,
    });

    await todo.save();

    res.status(201).json({
      success: true,
      message: "Todo created successfully",
      todo,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const todo = await todoModel.findByIdAndDelete(req.params.id);

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "Todo not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Todo deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const editTodo = async (req, res) => {
  try {
    if (req.file) {
      req.body.path = req.file.path;
      req.body.filetype = req.file.mimetype;
    }

    const todo = await todoModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "Todo not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Todo updated successfully",
      todo,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllTasks = async (req, res) => {
  try {
    const todos = await todoModel.find({});

    res.status(200).json({
      success: true,
      todos,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createTodo,
  deleteTodo,
  editTodo,
  getAllTasks,
};