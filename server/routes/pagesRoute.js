import express from "express";
import mongoose from "mongoose";
import PageSchema from "../model/pages.js";
import Page from "../model/pages.js"
// const Page = mongoose.model("Page", PageSchema);
const pagesRouter = express.Router();

pagesRouter.get("/api/pages", async (req, res) => {
  try {
    // await Page.deleteMany({})
    const pagesList = await Page.find();
    res.json(pagesList)
  } catch(error) {
    res.status(500).json({ message: error.message });
  }
});

pagesRouter.post("/api/pages", async (req, res) => {
  console.log(req.body)
  try {
    const pageData = req.body;
    const newPage = new Page(pageData); 
    await newPage.save();
    res.status(200).json({ message: "추가 성공", data: newPage });
  } catch(error) {
    res.status(500).json({ message: error.message });
  }
});

// pagesRouter.delete("/api/pages", async (req, res) => {
//   try {
//     const pageData = req.b ody;
//     const newPage = new Page(pageData); 
//     await newPage.save();
//     res.status(200).json({ message: "추가 성공", data: newPage });
//   } catch(error) {
//     res.status(500).json({ message: error.message });
//   }
// });

export default pagesRouter;
