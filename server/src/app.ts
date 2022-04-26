import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/");

mongoose.connect(`${import.meta.env.VITE_MONGO_URI}`);

const db = mongoose.connection;
db.once("open", () => console.log("Connected to database"));
db.on("error", (error) => console.log(error));

export default app;
