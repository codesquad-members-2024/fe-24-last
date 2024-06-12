import express from "express";
import { Pages } from "../model/pages.js";

const pagesRouter = express.Router();

pagesRouter.get("/", async (req, res) => {
  try {
    // await Page.deleteMany({})
    const pagesList = await Pages.find();
    res.json(pagesList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

pagesRouter.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const page = await Pages.findById(id);
    if (!page) {
      return res.status(404).json({ message: "Page not found" });
    }
    res.json(page);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

pagesRouter.post("/", async (req, res) => {
  console.log(req.body);
  try {
    const pageData = req.body;
    const newPage = new Pages(pageData);
    await newPage.save();
    res.status(200).json({ message: "추가 성공", data: newPage });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

pagesRouter.patch("/:id", async (req, res) => {
  const articleId = req.params.id;
  const { title } = req.body;

  if (typeof title !== "string") {
    return res.status(400).json({ error: "Title must be a string" });
  }

  try {
    const article = await Pages.findById(articleId);

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

pagesRouter.delete("/api/pages", async (req, res) => {
  try {
    const pageData = req.body;
    const newPage = new Pages(pageData);
    await newPage.save();
    res
      .status(200)
      .json({ message: "Page deleted successfully", data: newPage });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

pagesRouter.post("/:id/block", async (req, res) => {
  const { id: articleId } = req.params;
  const { type, content, children } = req.body;

  try {
    const article = await Pages.findById(articleId);
    const newBlock = { type, content, children };
    article.blocklist.push(newBlock);
    await article.save();
    res
      .status(201)
      .json({ message: "Block added successfully", block: newBlock });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

pagesRouter.patch("/:id/block/:blockId", async (req, res) => {
  const { id: articleId, blockId } = req.params;
  const { content } = req.body;

  try {
    const article = await Pages.findById(articleId);
    const block = article.blocklist.id(blockId);
    block.content = content;
    await article.save();
    res.json({ message: "Block updated successfully", block });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

pagesRouter.delete("/:id/block/:blockId", async (req, res) => {
  const { id: articleId, blockId } = req.params;

  try {
    const article = await Pages.findById(articleId);
    article.blocklist = article.blocklist.filter(
      (block) => block._id.toString() !== blockId
    );
    await article.save();
    res.json({ message: "Block deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default pagesRouter;
