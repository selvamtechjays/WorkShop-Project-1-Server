//Import mongoose
const mongoose = require("mongoose");

//Db url
const DATABASE_URL =
  "mongodb+srv://selvamurugaiah100:Mselva95@cluster0.zphx6l8.mongodb.net/work";

//Database connection

mongoose
  .connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB Atlas connected");
  })
  .catch((error) => {
    console.error("MongoDB Atlas connection error:", error);
  });

module.exports = mongoose.connection;
