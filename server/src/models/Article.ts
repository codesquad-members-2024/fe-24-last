import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema({
  id: Number,
  content: String,
  updatedAt: String,
});

const Article = mongoose.model('Article', articleSchema);

export default Article;
