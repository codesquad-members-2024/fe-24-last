import { Schema, model } from 'mongoose';
import { ArticleSchema } from './Article.js';

const TeamspaceSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  articles: { type: [ArticleSchema], default: [] },
});

const Teamspace = model('Teamspace', TeamspaceSchema);

export default Teamspace;
