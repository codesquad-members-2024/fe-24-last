import express from "express";
import router from "./routes/router.js";
import "dotenv/config";
import cors from "cors";
import connectDB from "./mongodb.js";
const app = express();
const port = 3000;

app.use(cors());

connectDB();

app.use(express.json());
app.use("/api/articles", router);

app.listen(port, () => {
  console.log(`port ${port}`);
});
