const express = require('express');
const mongoose = require('mongoose')
const app = express();
const cors = require('cors');
const multer  = require('multer');
const { createTodo, editTodo, deleteTodo } = require('./controller/todoController');

const storage = multer.diskStorage({
destination: function(req, file, callback){
    callback(null, './uploads');
},

filename: function(req, file, callback){
    const unique = 'file' + '-' + Date.now() + '-' + file.originalname;
    callback(null, unique) 
}
})

const upload = multer({storage: storage});


app.use (express.json());
app.use(cors());

mongoose.connect('mongodb+srv://shayan:jWdKtfHJ5qoRVAY1@firstclasspractice.4562jwp.mongodb.net/exam?appName=FirstClassPractice').then(() => console.log('DataBase Connected')).catch((err) => console.log(err))

// routes
app.post('/create/task', upload.single('file'), createTodo);
app.delete('/delete/task/:id', deleteTodo);
app.post('/edit/task/:id', editTodo);
app.get('/all/tasks', getAllTasks);





const PORT = 5000;
app.listen(PORT, () => {
    console.log('server is running');
    
})