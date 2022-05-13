import express = require("express");
import dotenv = require("dotenv");
import cors = require("cors");
import mongoose = require("mongoose");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/");

mongoose.connect(`${process.env.MONGO_URI}`);

const db = mongoose.connection;
db.once("open", () => console.log("Connected to database"));
db.on("error", (error) => console.log(error));

export default app;
