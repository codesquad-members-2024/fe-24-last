import express from "express";
import PageSchema from "../Models/pagesSchema.js";

const pagesListRouter = express.Router();

pagesListRouter.get("/api/pagesList", async (req, res) => {
    try {
        const pageData = await PageSchema.find();
        res.json(pageData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

pagesListRouter.post("/api/pagesList", async (req, res) => {
    try {
        const pageData = req.body;
        const newPage = new PageSchema(pageData);
        await newPage.save();
        res.status(200).json({ message: "추가 성공", data: newPage });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default pagesListRouter;
