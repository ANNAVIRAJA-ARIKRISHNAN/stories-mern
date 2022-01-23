import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";

import postRoutes from "./routes/posts.js";
import userRouter from "./routes/user.js";

const app = express();
dotenv.config();
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/posts", postRoutes);
app.use("/user", userRouter);

const __dirname = path.resolve();
const buildPath = path.join(__dirname, "../build");
app.use(express.static(buildPath));

app.get("*", (req, res) => {
  // console.log(path.join(__dirname, "..", "build", "index.html"));
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

//const CONNECTION_URL = "mongodb://localhost:27017/storiesDB";
// const CONNECTION_URL =
//   "mongodb+srv://annaviraja:rajaking@storiescluster.onsft.mongodb.net/storiesDB?retryWrites=true&w=majority";
const CONNECTION_URL = process.env.DB_CONNECTION_URL;
//console.log(CONNECTION_URL);
const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => {
      console.log("db connected");
      console.log(`Server Running on Port: http://localhost:${PORT}`);
    })
  )
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set("useFindAndModify", false);
