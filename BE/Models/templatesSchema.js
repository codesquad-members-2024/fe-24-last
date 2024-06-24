import mongoose from "mongoose";
import { PageSchema } from "./pagesSchema.js";
const Schema = mongoose.Schema;

const ColumnSchema = new Schema({
    title: String,
    pages: [PageSchema]
});

const TemplatesSchema = new Schema({
    title: String,
    columns: [ColumnSchema]
});

const Templates = mongoose.model("Templates", TemplatesSchema);

export default Templates;
