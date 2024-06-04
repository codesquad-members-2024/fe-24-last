import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import pagesListRouter from "./routes/pageListRouter.js";
import data from "./data.json" assert { type: "json" };
import Pages from "./Models/pagesSchema.js";
import 'dotenv/config';

const url = process.env.REACT_APP_MONGODB_URL;

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

mongoose
    .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err));

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", async() => {
    console.log("MongoDB connected");
    await initData()
});

const initData = async() => {
    // await Pages.deleteMany({});
    try {
        const dbCount = await Pages.countDocuments();
        if (!dbCount) await Pages.insertMany(data);
    } catch (error) {
        console.error("insertMany 에러:", error);
    }
}

app.use("/", pagesListRouter);


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
