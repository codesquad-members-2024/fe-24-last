import express from "express";
import TemplatesSchema from "../Models/templatesSchema.js";
import PageSchema from "../Models/pagesSchema.js";

const TEMPLATE_FORM = {
    "title": "작업 목록 템플릿",
    "columns": [
        {
            "title": "할일",
            "pages": []
        },
        {
            "title": "진행중",
            "pages": []
        },
        {
            "title": "완료",
            "pages": []
        }
    ]
};

const TemplatesRouter = express.Router();

TemplatesRouter.get("/api/templateList", async (req, res) => {
    try {
        const templateData = await TemplatesSchema.find().populate({
            path: 'columns.pages',
            model: 'Page'
        });
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
        const newTemplate = new TemplatesSchema(TEMPLATE_FORM);
        await newTemplate.save();
        res.status(201).send(newTemplate);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

TemplatesRouter.delete("/api/template/delete/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletedPage = await TemplatesSchema.findByIdAndDelete(id);
        if (!deletedPage) {
            return res.status(404).json({ message: "Page not found" });
        }
        res.status(200).send("삭제 성공!");
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

TemplatesRouter.post(
    "/api/template/:templateId/column/:columnId/newPage",
    async (req, res) => {
        const { templateId, columnId } = req.params;
        try {
            const newPage = new PageSchema({
                title: "untitled",
                blocklist: [{
                    type: "p",
                    content: "",
                    children: [],
                }],
                parent_id: null,
                category: "template" // 여기서 카테고리 설정
            });
            await newPage.save();

            const template = await TemplatesSchema.findById(templateId);

            if (!template) {
                return res.status(404).json({ message: "Template not found" });
            }

            const column = template.columns.id(columnId);
            if (!column) {
                return res.status(404).json({ message: "Column not found" });
            }

            column.pages.push(newPage._id);
            await template.save();

            const populatedTemplate = await TemplatesSchema.findById(templateId).populate({
                path: 'columns.pages',
                model: 'Page'
            });

            res.status(201).send(populatedTemplate);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
);

export default TemplatesRouter;
