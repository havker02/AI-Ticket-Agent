import express from "express";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.js";

const app = express();
config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

const port = process.env.PORT || 3000;

app.get("/", (_, res) => {
  res.status(200).json({
    message: "Welcome to AI Ticket App 🚀",
    version: "1.0.0",
    author: "Surajit",
    github: "https://github.com/surajit20107",
  })
});

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is up & running...!! 🚀`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err.message);
  });
