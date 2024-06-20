import express from "express";
import mongoose from "mongoose";
import { Articles } from "../model/index.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    // await Article.deleteMany({});
    const articleList = await Articles.find();
    res.json(articleList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const article = await Articles.findById(id);
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }
    res.json(article);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const articleData = req.body;
    const newArticle = new Articles(articleData);
    await newArticle.save();
    res.status(200).json({ message: "추가 성공", data: newArticle });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.patch("/:id", async (req, res) => {
  const articleId = req.params.id;
  const { title } = req.body;

  if (typeof title !== "string") {
    return res.status(400).json({ error: "Title must be a string" });
  }

  try {
    const article = await Articles.findById(articleId);

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

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedArticle = await Articles.findByIdAndDelete(id);
    if (!deletedArticle) {
      return res.status(404).json({ message: "Article not found" });
    }
    res
      .status(200)
      .json({ message: "Article deleted successfully", data: deletedArticle });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/:id/block/:blockId/element", async (req, res) => {
  const { id: articleId, blockId } = req.params;
  const { type, content, columnIndex, elementIndex } = req.body;

  try {
    const article = await Articles.findById(articleId);

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    const blockIndex = article.blockList.findIndex(
      (block) => block._id.toString() === blockId
    );

    if (blockIndex === -1) {
      return res.status(404).json({ message: "Block not found" });
    }

    const block = article.blockList[blockIndex];
    let newElementId = null;

    if (columnIndex === undefined || elementIndex === undefined) {
      const newElement = { _id: new mongoose.Types.ObjectId(), type, content };
      const newBlock = {
        _id: new mongoose.Types.ObjectId(),
        columnList: [[newElement]],
      };
      article.blockList.push(newBlock);
      newElementId = newElement._id;
    } else if (
      block.columnList.length === 1 &&
      block.columnList[0].length === 1
    ) {
      const newElement = { _id: new mongoose.Types.ObjectId(), type, content };
      const newBlock = {
        _id: new mongoose.Types.ObjectId(),
        columnList: [[newElement]],
      };
      article.blockList.splice(blockIndex + 1, 0, newBlock);
      newElementId = newElement._id;
    } else {
      if (block.columnList[columnIndex]) {
        const newElement = {
          _id: new mongoose.Types.ObjectId(),
          type,
          content,
        };
        block.columnList[columnIndex].splice(elementIndex + 1, 0, newElement);
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

router.patch("/:id/block/:blockId/element/:elementId", async (req, res) => {
  const { id: articleId, blockId, elementId } = req.params;
  const { content } = req.body;

  try {
    const article = await Articles.findById(articleId);
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    //리팩토링이 필요해 보인다
    let blockFound = false;
    for (let block of article.blockList) {
      if (block._id.toString() === blockId) {
        let columnFound = false;
        for (let column of block.columnList) {
          for (let element of column) {
            if (element._id.toString() === elementId) {
              element.content = content;
              columnFound = true;
              break;
            }
          }
          if (columnFound) break;
        }

        if (!columnFound) {
          return res.status(404).json({ message: "Element not found" });
        }

        blockFound = true;
        break;
      }
    }

    if (!blockFound) {
      return res.status(404).json({ message: "Block not found" });
    }

    await article.save();
    res
      .status(200)
      .json({ message: "Element content updated successfully", article });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id/block/:blockId/element/:elementId", async (req, res) => {
  const { id: articleId, blockId, elementId } = req.params;

  try {
    const article = await Articles.findById(articleId);
    const blockIndex = article.blockList.findIndex(
      (block) => block._id.toString() === blockId
    );
    const block = article.blockList[blockIndex];

    let elementRemoved = false;

    block.columnList = block.columnList
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
      if (block.columnList.length === 0) {
        article.blockList.splice(blockIndex, 1);
      }

      await article.save();
      return res.status(200).json({ message: "Element deleted successfully" });
    } else {
      return res.status(404).json({ message: "Element not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
