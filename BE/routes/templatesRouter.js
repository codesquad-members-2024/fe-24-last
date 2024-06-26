import express from "express"
import TemplatesSchema from "../Models/templatesSchema.js"

const TemplatesRouter = express.Router();

TemplatesRouter.get("/api/templateList", async (req, res) => {
    try {
        const templateData = await TemplatesSchema.find();
        res.json(templateData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

TemplatesRouter.patch("/api/template/title/:id", async (req, res) => {
    const { id } = req.params;
    const { title } = req.body;

    if (typeof title !== "string") {
        return res.status(400).json({ error: "Title must be a string" });
    }

    try {
        const article = await TemplatesSchema.findById(id);

        if (!article) {
            return res.status(404).json({ error: "Article not found" });
        }

        article.title = title;
        await article.save();

        res.json({ message: "Title updated successfully", article });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

TemplatesRouter.post("/api/newTemplate", async (req, res) => {
    try {
        const templateData = req.body;
        const newPage = new TemplatesSchema(templateData);
        await newPage.save();
        res.status(201).send(newPage);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
export default TemplatesRouter