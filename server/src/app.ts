const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
// const router = require("./routes/auth");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.VITE_MONGO_URI);

const db = mongoose.connection;
db.once("open", () => console.log("Connected to database"));
db.on("error", (error) => console.log(error));

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
