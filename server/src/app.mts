import express from "express";
import routes from "./routes/auth.mjs";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

const mongoURI = `${process.env.VITE_MONGO_URI}`;

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use("/auth", routes);

app.use('/', routes);

mongoose.Promise = global.Promise;
mongoose.connect(mongoURI);

const db = mongoose.connection;
db.once("open", () => console.log("Connected to database"));
db.on("error", (error: Error) => console.log(error));

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
