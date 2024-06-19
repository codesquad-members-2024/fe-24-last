import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ChildrenSchema = new Schema(
  {
    type: String,
    content: String,
  },
  {
    versionKey: false,
  }
);

export const BlockSchema = new Schema(
  {
    type: String,
    content: String,
    children: [ChildrenSchema] || [],
  },
  {
    versionKey: false,
  }
);

const PageSchema = new Schema(
  {
    title: String,
    blocklist: [BlockSchema] || [],
    parent_id: String || null,
  },
  {
    versionKey: false,
  }
);

export const Pages = mongoose.model("Page", PageSchema);
export const Blocks = mongoose.model("Block", BlockSchema);
