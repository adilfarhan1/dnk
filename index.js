import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv, { config } from "dotenv";
import userR from "./routes/userR.js";
import cookieParser from "cookie-parser";
import taskR from "./routes/taskR.js";
import teamR from "./routes/teamR.js";
import fileUpload from "express-fileupload";

const app = express();
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("connected to mongodb");
  } catch (err) {
    console.log(err);
  }
};

app.use(cookieParser());
app.use(fileUpload())
app.use(cors({ credentials: true, origin: ["http://localhost:3000", " "] }));
app.use(express.json({ extended: false }));
app.use(express.static('image'))
app.use("/user/", userR);
app.use("/task/", taskR);
app.use("/team/", teamR);

app.use((err, req, res, next) => {
  const errMessage = err.message || "Error from backend";
  const errStatus = err.status || 500;
  res.status(err.status).json({
    success: false,
    stack: err.stack,
    message: errMessage,
  });
});

app.listen(8800, () => {
  connect();
  console.log("connected to backend");
});
