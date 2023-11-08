require("dotenv").config();
const express = require("express");
const port = process.env.PORT || 8000;
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/Internee", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});
  

app.get('/', (req, res) => {
res.send("Hello world");
});

app.use("/api", userRoutes);
app.post("/api", userRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${port}`);
  });
