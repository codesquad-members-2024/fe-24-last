import express from "express";
import { Pages, Blocks } from "../model/pages.js";

const pagesRouter = express.Router();

pagesRouter.get("/api/pages", async (req, res) => {
  try {
    const pagesList = await Pages.find();
    res.json(pagesList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

pagesRouter.post("/api/pages", async (req, res) => {
  try {
    const pageData = req.body;
    const newPage = new Pages(pageData);
    await newPage.save();
    res.status(200).json({ message: "추가 성공", data: newPage });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

pagesRouter.get("/api/pages/:id", async (req, res) => {
  try {
    const pageId = req.params.id;
    const page = await Pages.findById(pageId);
    if (!page) {
      return res.status(404).json({ message: "Page not found" });
    }
    res.json(page);
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

    const article = await Pages.findById(pageId);

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
    const page = await Pages.findByIdAndDelete(pageId);

    if (!page) {
      return res.status(404).json({ error: "Page not found" });
    }

    res.status(200).json({ message: "Deletion successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

pagesRouter.get("/api/pages/:id/blocks/:blockId", async (req, res) => {
  try {
    const { id: pageId, blockId } = req.params;

    const page = await Pages.findById(pageId);
    if (!page) {
      return res.status(404).json({ message: "Page not found" });
    }

    const block = page.blocklist.id(blockId);
    if (!block) {
      return res.status(404).json({ message: "Block not found" });
    }

    res.status(200).json(block);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

pagesRouter.post("/api/pages/:id/blocks", async (req, res) => {
  try {
    const pageId = req.params.id;

    const page = await Pages.findById(pageId);
    if (!page) return res.status(404).json({ message: "Page not found" });

    const newBlock = new Blocks({ type: "p", content: "", children: [] });

    page.blocklist.push(newBlock);
    await page.save();

    res.status(200).json({ message: "블록 추가 성공", data: newBlock });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

pagesRouter.patch("/api/pages/:id/blocks", async (req, res) => {
  try {
    const { id: pageId } = req.params;
    const { blocks } = req.body;

    const page = await Pages.findById(pageId);
    if (!page) {
      return res.status(404).json({ message: "Page not found" });
    }

    page.blocklist = blocks;

    await page.save();
    res.status(200).json({ message: "Blocks reordered successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

pagesRouter.patch("/api/pages/:id/blocks/:blockId", async (req, res) => {
  try {
    const { id: pageId, blockId } = req.params;
    const updatedBlockData = req.body;

    const page = await Pages.findById(pageId);
    if (!page) {
      return res.status(404).json({ message: "Page not found" });
    }

    const block = page.blocklist.id(blockId);
    if (!block) {
      return res.status(404).json({ message: "Block not found" });
    }

    block.set(updatedBlockData);
    await page.save();

    res
      .status(200)
      .json({ message: "Block updated successfully", data: block });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

pagesRouter.delete("/api/pages/:id/blocks/:blockId", async (req, res) => {
  try {
    const { id: pageId, blockId } = req.params;

    const page = await Pages.findById(pageId);
    if (!page) {
      return res.status(404).json({ message: "Page not found" });
    }

    const blockIndex = page.blocklist.findIndex(
      (block) => block.id === blockId
    );
    if (blockIndex === 0) {
      return res.status(404).json({ message: "Block not found" });
    }

    page.blocklist.splice(blockIndex, 1);
    await page.save();

    res.status(200).json({ message: "Block deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default pagesRouter;
