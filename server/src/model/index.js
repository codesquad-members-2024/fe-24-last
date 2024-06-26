import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ElementSchema = new Schema({
  type: String,
  content: String,
});

const BlockSchema = new Schema({
  columnList: [[ElementSchema]],
});

const ArticleSchema = new Schema({
  title: String,
  blockList: [BlockSchema],
  parent_id: String,
});

export const ArticlesModel = mongoose.model("Article", ArticleSchema);
