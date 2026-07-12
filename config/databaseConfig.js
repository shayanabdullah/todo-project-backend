const mongoose = require("mongoose");

const dbConncetion = async () => {
 return await mongoose
    .connect(
      "mongodb+srv://shayan:jWdKtfHJ5qoRVAY1@firstclasspractice.4562jwp.mongodb.net/exam?appName=FirstClassPractice",
    )
    .then(() => console.log("DataBase Connected"))
    .catch((err) => console.log(err));
};

module.exports = dbConncetion;