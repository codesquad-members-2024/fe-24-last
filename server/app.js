import express from "express";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("하이!");
});

app.listen(port, () => {
  console.log(`port ${port}`);
});
