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

pagesListRouter.post("/api/newPage", async (req, res) => {
    try {
        const pageData = req.body;
        const newPage = new PageSchema(pageData);
        await newPage.save();
        res.status(201).send(newPage); 
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

pagesListRouter.delete("/api/delete/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletedPage = await PageSchema.findByIdAndDelete(id);
        if (!deletedPage) {
            return res.status(404).json({ message: "Page not found" });
        }
        res.status(200).send("삭제 성공!"); 
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default pagesListRouter;
