const express = require("express");
const dbConncetion = require("./config/databaseConfig");
const app = express();
const cors = require("cors");
const {
  createTodo,
  editTodo,
  deleteTodo,
  getAllTasks,
} = require("./controller/todoController");

const upload = require("./config/uploadConfing");



app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));
dbConncetion();

// routes
app.post("/create/task", upload.single("file"), createTodo);
app.delete("/delete/task/:id", deleteTodo);
app.post("/edit/task/:id", upload.single("file"), editTodo);
app.get("/all/tasks", getAllTasks);

const PORT = 5000;
app.listen(PORT, () => {
  console.log("server is running");
});
