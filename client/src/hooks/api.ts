import { QueryClient, useMutation, useQuery } from "react-query";
import {
  deleteArticle,
  deleteElement,
  getArticleById,
  getArticles,
  patchArticleTitle,
  patchElement,
  postNewArticle,
  postNewBlockOrElement,
  patchElementIndex,
} from "../services/api";
import { ElementIndexInfo } from "../model/types";

export function useGetArticles() {
  return useQuery("articles", getArticles);
}

export function useGetArticle(id?: string) {
  return useQuery(["article", id], () => getArticleById(id), {
    enabled: !!id,
  });
}

export function useUpdateArticleTitle(id: string, queryClient: QueryClient) {
  return useMutation((newTitle: string) => patchArticleTitle(id, newTitle), {
    onSuccess: () => queryClient.invalidateQueries(["articles"]),
  });
}

export function useCreateNewArticle(queryClient: QueryClient) {
  return useMutation(postNewArticle, {
    onSuccess: () => queryClient.invalidateQueries(["articles"]),
  });
}

export function useDeleteArticle(queryClient: QueryClient) {
  return useMutation((id: string) => deleteArticle(id), {
    onSuccess: () => queryClient.invalidateQueries(["articles"]),
  });
}

interface MutatePatchElementParams {
  type?: string;
  newContent?: string;
  elementIndexInfo: ElementIndexInfo;
}

export function useUpdatePatchElement(articleId: string) {
  return useMutation(
    ({ type, newContent, elementIndexInfo }: MutatePatchElementParams) =>
      patchElement({ articleId, type, newContent, elementIndexInfo })
  );
}

export function useCreateNewBlockOrElement(
  articleId: string,
  queryClient: QueryClient
) {
  return useMutation(
    (targetIndexInfo: Partial<ElementIndexInfo>) =>
      postNewBlockOrElement(articleId, targetIndexInfo),
    {
      onSuccess: () => queryClient.invalidateQueries(["article", articleId]),
    }
  );
}

export function useDeleteElement(articleId: string, queryClient: QueryClient) {
  return useMutation(
    (elementIndexInfo: ElementIndexInfo) =>
      deleteElement(articleId, elementIndexInfo),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(["article", articleId]);
        return data;
      },
    }
  );
}

export function useMoveElement(articleId: string, queryClient: QueryClient) {
  return useMutation(
    ({
      elementIndexInfo,
      targetIndexInfo,
    }: {
      elementIndexInfo: ElementIndexInfo;
      targetIndexInfo: Partial<ElementIndexInfo>;
    }) => patchElementIndex(articleId, elementIndexInfo, targetIndexInfo),
    {
      onSuccess: () => queryClient.invalidateQueries(["article", articleId]),
    }
  );
}
