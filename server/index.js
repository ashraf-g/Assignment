const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

require("dotenv").config();
const PORT = process.env.PORT;

const dbConnect = require("./src/configs/db.connect");
// Import the seed function
// const { seedDatabase } = require("./src/utils/seed");

//connect to database
dbConnect();

//init app and middleware
const app = express();

const corsOptions = {
  origin: "*",
};
app.use(cors(corsOptions));

app.use(bodyParser.json({ limit: "10mb" }));

app.use(express.json({ limit: "10mb" }));

app.use(bodyParser.urlencoded({ extended: true }));

//home route
app.get("/", (req, res) => {
  res.send("Welcome to Sever");
});

//use routes
require("./src/routes/productTransaction.route")(app);

//listen server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} `);
});
