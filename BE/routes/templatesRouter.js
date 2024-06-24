import express from "express"
import TemplatesSchema from "../Models/templatesSchema.js"

const TemplatesRouter = express.Router();

TemplatesRouter.get("/api/templateList", async (req, res) => {
    try {
        const pageData = await TemplatesSchema.find();
        res.json(pageData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default TemplatesRouter