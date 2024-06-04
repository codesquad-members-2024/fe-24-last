import mongoose, { Schema } from 'mongoose';

const BlockSchema = new Schema(
  {
    type: { type: String, required: true },
    content: { type: String },
    level: { type: Number },
    items: { type: [String] },
    url: { type: String },
    alt: { type: String },
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
