import express from "express";
import mongoose from "mongoose";
import pagesRouter from "./routes/pagesRoute.js";
import PageSchema from "./model/pages.js";
import "dotenv/config";
import cors from "cors";

const app = express();
const port = 3000;

app.use(cors());

const mongoURL = process.env.MONGODB_URL;

mongoose
  .connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("MongoDB connected");
});

app.use(express.json());
// app.use(bodyParser.json());
app.use("/", pagesRouter);

app.get("/", (req, res) => {
  res.send("하이!");
});

app.listen(port, () => {
  console.log(`port ${port}`);
});
