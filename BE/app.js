import express from "express"
import cors from "cors"
import mongoose from 'mongoose';
import postListRouter from "./routes/postList.js";

const uri = "mongodb+srv://96limshyun:vI1QcxipDQv7xLt6@cluster0.t4amrc9.mongodb.net/";
const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

app.use('/', postListRouter);

mongoose.connect(uri)
    .then(() => console.log("연결완료"))
    .catch((error) => console.log("실패", error));

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
