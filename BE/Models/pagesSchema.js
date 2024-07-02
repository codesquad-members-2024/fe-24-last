import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ChildrenSchema = new Schema({
    type: String,
    content: String,
});

const BlockSchema = new Schema({
    type: String,
    content: String,
    children: [ChildrenSchema] || [],
});

export const PageSchema = new Schema({
    title: String,
    blocklist: [BlockSchema] || [],
    parent_id: String || null,
    category: String,
});

const Pages = mongoose.model("Page", PageSchema);

export default Pages;
