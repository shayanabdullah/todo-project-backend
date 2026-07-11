const mongoose = require("mongoose");

const { Schema } = mongoose;

const todoModel = Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "complete"],
    default: "pending",
  },
  priority: {
    type: String,
    enum: ['high', 'medium', 'low'],
    default:'medium',
  },
  path: {
    type: String,
  },
    filetype: {
      type: String,
    }


},

{
  collection: 'data'
}
);


module.exports = mongoose.model('exam', todoModel)