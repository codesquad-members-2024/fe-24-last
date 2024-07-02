import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ColumnSchema = new Schema({
    title: String,
    pages: [{ type: Schema.Types.ObjectId}]
});

const TemplatesSchema = new Schema({
    title: String,
    columns: [ColumnSchema]
});

const Templates = mongoose.model("Templates", TemplatesSchema);

export default Templates;