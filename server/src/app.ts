const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
// process.env.MONGO_URI
mongoose.connect(`mongodb+srv://cGuizar:Pokemon10@cluster0.qisaq.mongodb.net/?retryWrites=true&w=majority`);

const db = mongoose.connection;
db.once("open", () => console.log("Connected to database"));
db.on("error", (error) => console.log(error));

module.exports = app
