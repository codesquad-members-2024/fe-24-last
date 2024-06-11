import express from "express";
import { Blocks } from "../model/pages.js";

const blockRouter = express.Router();

blockRouter.patch("/:id", async (req, res) => {
  const blockId = req.params.id;
  const { content } = req.body;

  try {
    const block = await Blocks.findById(blockId);
    if (!block) {
      return res.statusMessage(400).json({ error: "Block not found" });
    }
    block.content = content;
    await block.save();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default blockRouter;
