const express = require("express");
const bodyParser = require("body-parser");
const router = require("./routes/task.route");

const app = express();

const mongoose = require("mongoose");

let dev_db_url = "mongodb://localhost:27017/todos";
const mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

db.on("connected", console.error.bind(console, "MongoDB connected"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/", router);

let port = 4000;

app.listen(port, () => {
  console.log("Server is up and running on port number " + port);
});
