import { createContext, ReactNode } from "react";
import { useQuery } from "react-query";
import { fetchArticles } from "../services/api";
import { Article } from "../model/types";

interface ArticleProviderProps {
  children: ReactNode;
}

interface ArticlesContextType {
  articles: Article;
  refetch: () => void;
}

export const ArticlesContext = createContext<ArticlesContextType | null>(null);

export function ArticleProvider({ children }: ArticleProviderProps) {
  const { data, refetch } = useQuery("articles", fetchArticles);

  return (
    <ArticlesContext.Provider value={{ articles: data, refetch }}>
      {children}
    </ArticlesContext.Provider>
  );
}
