import express from "express";

const postListRouter = express.Router();

postListRouter.get("/postList", (req, res) => {
    res.send("postList");
});

export default postListRouter;
