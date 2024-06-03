import express from "express";
import mongoose from "mongoose";
import routeRouter from "./routes/route.js";
const app = express();

const port = 3000;

app.use("/", routeRouter);

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })

// MongoDB 연결 문자열
const mongoURI =
  "mongodb://localhost:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.2.6";

mongoose
  .connect(mongoURI, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
