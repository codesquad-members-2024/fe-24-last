import express from "express";
import mongoose from "mongoose";
import { Pages, Blocks } from "../model/pages.js";

const pagesRouter = express.Router();

pagesRouter.get("/", async (req, res) => {
  try {
    // await Pages.deleteMany({});
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

pagesRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedPage = await Pages.findByIdAndDelete(id);
    if (!deletedPage) {
      return res.status(404).json({ message: "Page not found" });
    }
    res
      .status(200)
      .json({ message: "Page deleted successfully", data: deletedPage });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

pagesRouter.post("/:id/block/:blockId/element", async (req, res) => {
  const { id: articleId, blockId } = req.params;
  const { type, content, columnIndex, elementIndex } = req.body;

  try {
    const article = await Pages.findById(articleId);

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    const blockIndex = article.blocklist.findIndex(
      (block) => block._id.toString() === blockId
    );

    if (blockIndex === -1) {
      return res.status(404).json({ message: "Block not found" });
    }

    const block = article.blocklist[blockIndex];
    let newElementId = null;

    if (columnIndex === undefined || elementIndex === undefined) {
      const newElement = { _id: new mongoose.Types.ObjectId(), type, content };
      const newBlock = {
        _id: new mongoose.Types.ObjectId(),
        element: [[newElement]],
      };
      article.blocklist.push(newBlock);
      newElementId = newElement._id;
    } else if (block.element.length === 1 && block.element[0].length === 1) {
      const newElement = { _id: new mongoose.Types.ObjectId(), type, content };
      const newBlock = {
        _id: new mongoose.Types.ObjectId(),
        element: [[newElement]],
      };
      article.blocklist.splice(blockIndex + 1, 0, newBlock);
      newElementId = newElement._id;
    } else {
      if (block.element[columnIndex]) {
        const newElement = {
          _id: new mongoose.Types.ObjectId(),
          type,
          content,
        };
        block.element[columnIndex].splice(elementIndex + 1, 0, newElement);
        newElementId = newElement._id;
      }
    }

    await article.save();
    res.status(201).json({
      message: "Element added successfully",
      newElementId,
      data: article,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

pagesRouter.patch(
  "/:id/block/:blockId/element/:elementId",
  async (req, res) => {
    const { id: articleId, blockId, elementId } = req.params;
    const { content } = req.body;

    try {
      const page = await Pages.findById(articleId);
      if (!page) {
        return res.status(404).json({ message: "Page not found" });
      }

      //리팩토링이 필요해 보인다
      let blockFound = false;
      for (let block of page.blocklist) {
        if (block._id.toString() === blockId) {
          let elementFound = false;
          for (let row of block.element) {
            for (let element of row) {
              if (element._id.toString() === elementId) {
                element.content = content;
                elementFound = true;
                break;
              }
            }
            if (elementFound) break;
          }

          if (!elementFound) {
            return res.status(404).json({ message: "Element not found" });
          }

          blockFound = true;
          break;
        }
      }

      if (!blockFound) {
        return res.status(404).json({ message: "Block not found" });
      }

      await page.save();
      res
        .status(200)
        .json({ message: "Element content updated successfully", page });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

pagesRouter.delete(
  "/:id/block/:blockId/element/:elementId",
  async (req, res) => {
    const { id: articleId, blockId, elementId } = req.params;

    try {
      const article = await Pages.findById(articleId);
      const blockIndex = article.blocklist.findIndex(
        (block) => block._id.toString() === blockId
      );
      const block = article.blocklist[blockIndex];

      let elementRemoved = false;

      block.element = block.element
        .map((column) => {
          return column.filter((element) => {
            if (element._id.toString() === elementId) {
              elementRemoved = true;
              return false;
            }
            return true;
          });
        })
        .filter((column) => column.length > 0);

      if (elementRemoved) {
        if (block.element.length === 0) {
          article.blocklist.splice(blockIndex, 1);
        }

        await article.save();
        return res
          .status(200)
          .json({ message: "Element deleted successfully" });
      } else {
        return res.status(404).json({ message: "Element not found" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

export default pagesRouter;
