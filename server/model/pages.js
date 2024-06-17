import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ElementSchema = new Schema({
  type: String,
  content: String,
});

const BlockSchema = new Schema({
  element: [[ElementSchema]],
});

const PageSchema = new Schema({
  title: String,
  blocklist: [BlockSchema],
  parent_id: String,
});

export const Pages = mongoose.model("Page", PageSchema);
export const Blocks = mongoose.model("Block", BlockSchema);
