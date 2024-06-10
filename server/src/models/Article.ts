import mongoose, { Schema } from 'mongoose';

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
const articleSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  content: { type: [BlockSchema], required: true },
  updatedAt: { type: String, default: '1970-06-03T19:00:00+09:00' },
});

const Article = mongoose.model('Article', articleSchema);

export default Article;
