import express from "express";
import Page from "../model/pages.js";

const pagesRouter = express.Router();

pagesRouter.get("/api/pages", async (req, res) => {
  try {
    const pagesList = await Page.find();
    res.json(pagesList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

pagesRouter.get("/api/pages/:id", async (req, res) => {
  try {
    const pageId = req.params.id;
    const page = await Page.findById(pageId);
    if (!page) {
      return res.status(404).json({ message: "Page not found" });
    }
    res.json(page);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

pagesRouter.post("/api/pages", async (req, res) => {
  console.log(req.body);
  try {
    const pageData = req.body;
    const newPage = new Page(pageData);
    await newPage.save();
    res.status(200).json({ message: "추가 성공", data: newPage });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

pagesRouter.patch("/api/pages/:id", async (req, res) => {
  try {
    const pageId = req.params.id;
    const { title } = req.body;

    if (typeof title !== "string")
      return res.status(400).json({ error: "Title must be a string" });

    const article = await Page.findById(pageId);

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

pagesRouter.delete("/api/pages/:id", async (req, res) => {
  try {
    const pageId = req.params.id;
    const page = await Page.findByIdAndDelete(pageId);

    if (!page) {
      return res.status(404).json({ error: "Page not found" });
    }

    res.status(200).json({ message: "Deletion successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default pagesRouter;
