import { ArticlesModel } from "../model/index.js";

export async function getArticleById(articleId) {
  const article = await ArticlesModel.findById(articleId);

  if (!article) {
    throw new Error("Article not found");
  }

  return article.toObject();
}

export async function saveArticle(article) {
  await ArticlesModel.findByIdAndUpdate(article._id, article).exec();
}
