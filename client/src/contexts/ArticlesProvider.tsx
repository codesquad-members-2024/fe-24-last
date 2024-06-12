import { createContext, ReactNode, useContext } from "react";
import { useQuery } from "react-query";
import { fetchArticles } from "../services/api";
import { Article } from "../model/types";

interface ArticleProviderProps {
  children: ReactNode;
}

interface ArticlesContextType {
  articlesData: Article[];
  refetch: () => void;
}

const ArticlesContext = createContext<ArticlesContextType | undefined>(
  undefined
);

export function ArticlesProvider({ children }: ArticleProviderProps) {
  const { data, refetch } = useQuery("articles", fetchArticles);

  return (
    <ArticlesContext.Provider value={{ articlesData: data ?? [], refetch }}>
      {children}
    </ArticlesContext.Provider>
  );
}

export function useArticles(): ArticlesContextType {
  const context = useContext(ArticlesContext);
  if (!context) {
    throw new Error("useArticles must be used within an ArticlesProvider");
  }
  return context;
}
