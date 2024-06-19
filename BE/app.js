import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import pagesListRouter from "./routes/pageListRouter.js";
import data from "./data.json" assert { type: "json" };
import Pages from "./Models/pagesSchema.js";
import 'dotenv/config';
import WebSocket, { WebSocketServer } from "ws";

const url = process.env.REACT_APP_MONGODB_URL;

const app = express();
const port = 4000;
const wss = new WebSocketServer({ port: 4001 })

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"))

const initData = async() => {
    // await Pages.deleteMany({});
    try {
        const dbCount = await Pages.countDocuments();
        if (!dbCount) await Pages.insertMany(data);
    } catch (error) {
        console.error("insertMany 에러:", error);
    }
}

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

wss.on("connection", (ws, request) => {
    console.log(`새로운 유저 접속 ${request.socket.remoteAddress}, ${wss.clients.size}명`);

    ws.on("message", (message) => {
        const {id, blocks} = JSON.parse(message);
        
        wss.clients.forEach(client => {
            client.send(JSON.stringify({id, blocks}));
        });
    });

    ws.on("close", () => {
        console.log(`유저 연결 종료 ${request.socket.remoteAddress}`);
    });
});

app.use("/", pagesListRouter);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
