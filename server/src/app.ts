import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/");

mongoose.connect(`mongodb+srv://<cguizar525>:<Pokemon10>@cluster0.arsar.mongodb.net/FoodPrint?retryWrites=true&w=majority`);

const db = mongoose.connection;
db.once("open", () => console.log("Connected to database"));
db.on("error", (error) => console.log(error));

export default app;
