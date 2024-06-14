import { Schema, model } from 'mongoose';

const ItemSchema = new Schema(
  {
    type: { type: String, required: true },
    content: { type: String, required: true },
  },
  { _id: false }
);

const BlockSchema = new Schema(
  {
    type: { type: String, required: true },
    content: { type: String },
    level: { type: Number },
    url: { type: String },
    alt: { type: String },
    items: [ItemSchema],
  },
  { _id: false }
);

export const ArticleSchema = new Schema({
  title: { type: String },
  icon: { type: String },
  content: { type: [BlockSchema], required: true },
  updatedAt: { type: String, default: '1970-06-03T19:00:00+09:00' },
});

const Article = model('Article', ArticleSchema);

export default Article;
