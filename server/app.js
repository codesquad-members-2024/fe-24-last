import express from "express";
import mongoose from "mongoose";
import pagesRouter from "./routes/pagesRoute.js";
import PageSchema from "./model/pages.js";
import cors from "cors";

const app = express();
const port = 3000;

app.use(cors());

const mongoURI =
"mongodb+srv://96limshyun:vI1QcxipDQv7xLt6@cluster0.t4amrc9.mongodb.net/"; // env 이동예정

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
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
