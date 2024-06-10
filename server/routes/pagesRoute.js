import express from "express";
import Page from "../model/pages.js";

const pagesRouter = express.Router();

pagesRouter.get("/api/pages", async (req, res) => {
  try {
    // await Page.deleteMany({})
    const pagesList = await Page.find();
    res.json(pagesList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

pagesRouter.get("/api/pages/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const page = await Page.findById(id);
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
  const articleId = req.params.id;
  const { title } = req.body;

  if (typeof title !== "string") {
    return res.status(400).json({ error: "Title must be a string" });
  }

  try {
    const article = await Page.findById(articleId);

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

// pagesRouter.delete("/api/pages", async (req, res) => {
//   try {
//     const pageData = req.body;
//     const newPage = new Page(pageData);
//     await newPage.save();
//     res.status(200).json({ message: "삭제 성공", data: newPage });
//   } catch(error) {
//     res.status(500).json({ message: error.message });
//   }
// });

export default pagesRouter;
