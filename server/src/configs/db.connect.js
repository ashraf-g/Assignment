const mongoose = require("mongoose");
require("dotenv").config();
const dbConfig = process.env.MONGO_URL;

const dbConnect = () => {
  // mongoose
  //   .connect(dbConfig, {
  //     useNewUrlParser: true,
  //     useUnifiedTopology: true,
  //     dbName: "Assessment_1",
  //   })
  //   .then(() => {
  //     console.log("Successfully connected to Database");
  //   })
  //   .catch((err) => {
  //     console.error("Error connecting to MongoDB:", err);
  //   });
  mongoose.connect(process.env.MONGO_URL, { dbName: "Assessment_1" })
  .then(() => console.log("Successfully connected to Database"))
  .catch(err => console.error("Error connecting to MongoDB:", err));

};

module.exports = dbConnect;
