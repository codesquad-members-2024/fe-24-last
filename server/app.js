import express from "express";
import pagesRouter from "./routes/pagesRoute.js";
import "dotenv/config";
import cors from "cors";
import connectDB from "./mongodb.js";
const app = express();
const port = 3000;

app.use(cors());

connectDB();

app.use(express.json());
app.use("/api/pages", pagesRouter);

app.listen(port, () => {
  console.log(`port ${port}`);
});
