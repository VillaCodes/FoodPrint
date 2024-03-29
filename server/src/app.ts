// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import routes from "./routes/auth.ts";
import dotenv from "dotenv";
import express from 'express';
import cors from "cors"
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

const mongoURI = `${process.env.VITE_MONGO_URI}`;

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/auth", routes);

app.use('/', routes);

mongoose.Promise = global.Promise;
mongoose.connect(mongoURI);

const db = mongoose.connection;
db.once("open", () => console.log("Connected to database"));
db.on("error", (error: Error) => console.log(error));

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
