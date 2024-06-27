import express from "express";
import { ArticlesModel } from "../model/index.js";
import { getArticleById, saveArticle } from "../service/article.js";
import {
  addBlock,
  addElement,
  createNewBlock,
  createNewElement,
  deleteElement,
  indexGuard,
  moveElement,
} from "../service/blockList.js";

const router = express.Router();

/*
  아티클 핸들링 API
*/

router.get("/", async (_, res) => {
  try {
    const articleList = await ArticlesModel.find();
    res.json(articleList);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "something wrong" });
    }
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const article = await getArticleById(id);
    res.json(article);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "something wrong" });
    }
  }
});

router.post("/", async (req, res) => {
  try {
    const articleData = req.body;
    const newArticle = new ArticlesModel(articleData);
    await newArticle.save();
    res.status(200).json({ message: "추가 성공", data: newArticle });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "something wrong" });
    }
  }
});

router.patch("/:id", async (req, res) => {
  const articleId = req.params.id;
  const { title } = req.body;

  if (typeof title !== "string") {
    return res.status(400).json({ error: "Title must be a string" });
  }

  try {
    const article = await getArticleById(articleId);
    article.title = title;
    await saveArticle(article);
    res.json({ message: "Title updated successfully", article });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "something wrong" });
    }
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedArticle = await ArticlesModel.findByIdAndDelete(id);
    if (!deletedArticle) {
      return res.status(404).json({ message: "Article not found" });
    }
    res
      .status(200)
      .json({ message: "Article deleted successfully", data: deletedArticle });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "something wrong" });
    }
  }
});

/*
  블록 핸들링 API
*/

//블록 또는 요소 추가
router.post("/:id/blockOrElement", async (req, res) => {
  const { id: articleId } = req.params;
  const { blockIndex, columnIndex, elementIndex } = req.body;

  try {
    const article = await getArticleById(articleId);
    let newElement;

    if (columnIndex === undefined || elementIndex === undefined) {
      // 블록 추가
      newElement = createNewElement("text", "");
      const newBlock = createNewBlock(newElement);
      const newBlockList = addBlock(article.blockList, blockIndex, newBlock);
      article.blockList = newBlockList;
    } else {
      // 엘리먼트 추가
      indexGuard(article.blockList, { blockIndex, columnIndex });
      newElement = createNewElement();
      const newBlockList = addElement(
        article.blockList,
        {
          blockIndex,
          columnIndex,
          elementIndex,
        },
        newElement
      );
      article.blockList = newBlockList;
    }

    await saveArticle(article);

    res.status(200).json({
      message: "Element added successfully",
      newElementId: newElement._id,
      data: article,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "something wrong" });
    }
  }
});

// element 삭제
router.delete("/:id/element", async (req, res) => {
  const { id: articleId } = req.params;
  const { blockIndex, columnIndex, elementIndex } = req.body;

  try {
    const article = await getArticleById(articleId);
    indexGuard(article.blockList, { blockIndex, columnIndex, elementIndex });

    const newBlockList = deleteElement(article.blockList, {
      blockIndex,
      columnIndex,
      elementIndex,
    });
    article.blockList = newBlockList;

    await saveArticle(article);
    return res.status(200).json({ message: "Element deleted successfully" });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "something wrong" });
    }
  }
});

// element 수정
router.patch("/:id/element", async (req, res) => {
  const { id: articleId } = req.params;
  const { content, type, elementIndexInfo } = req.body;

  if (!elementIndexInfo) {
    return res.status(400).json({ message: "elementIndexInfo is required" });
  }

  const { blockIndex, columnIndex, elementIndex } = elementIndexInfo;

  try {
    const article = await getArticleById(articleId);
    indexGuard(article.blockList, elementIndexInfo);
    const element =
      article.blockList[blockIndex]?.columnList[columnIndex]?.[elementIndex];
    if (!element) {
      return res.status(404).json({ message: "Element not found" });
    }
    element.content = content;
    element.type = type;

    await saveArticle(article);
    res.status(200).json({ message: "Element updated successfully", article });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "something wrong" });
    }
  }
});

// element 이동
router.patch("/:id/element/move", async (req, res) => {
  const { id: articleId } = req.params;
  const { elementIndexInfo, targetIndexInfo } = req.body;

  try {
    const article = await getArticleById(articleId);
    indexGuard(article.blockList, elementIndexInfo);
    const newBlockList = moveElement(
      article.blockList,
      elementIndexInfo,
      targetIndexInfo
    );
    article.blockList = newBlockList;

    await saveArticle(article);
    res.status(200).json({ message: "Element moved successfully", article });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "something wrong" });
    }
  }
});

export default router;
