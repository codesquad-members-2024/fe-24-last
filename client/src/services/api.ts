import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Block } from "../components/ArticleLayout";
const server = import.meta.env.VITE_SERVER_URL;

interface RequestOptions {
  method: string;
  headers: {
    "Content-Type": string;
  };
  body?: string;
}

export interface NewPageData {
  title: string;
  blocklist: [];
  parent_id: string;
}

export interface NewBlockData {
  type: string;
  content: string;
  index?: number;
  children?: unknown[];
}

type DataType = NewPageData | NewBlockData;

const requestAPI = async (endpoint: string, method = "GET", data?: object) => {
  const options: RequestOptions = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (data) {
    options.body = JSON.stringify(data);
  }

  const response = await fetch(`${server}/${endpoint}`, options);
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  if (method !== "DELETE") {
    return await response.json();
  }
};

export const useGetPage = (endpoint: string) => {
  const { data, isLoading } = useQuery({
    queryKey: [endpoint],
    queryFn: () => requestAPI(endpoint),
  });
  return { data, isLoading };
};

export const useCreateNewData = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (newData: DataType) => requestAPI("pages", "POST", newData),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["pages"] });
      return data; // 생성된 페이지 데이터를 반환해야 _id 받아올 수 있음
    },
  });
  return mutate;
};

export const useDeletePage = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async (pageId: string) => {
      return await requestAPI(`pages/${pageId}`, "DELETE");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pages"] });
    },
  });
  return mutate;
};

export interface NewTitleMutate {
  newTitle: string;
}

export interface NewBlockMutate {
  newData: NewBlockData;
  blockId: string | number;
}  

export interface BlockContentMutate {
  newContent: string;
  blockId: string | number;
}  

export interface BlockOrderMutate {
  newData: Block[];
}  

type PatchBlockMutate = NewTitleMutate | NewBlockMutate | BlockContentMutate | BlockOrderMutate

export const usePatchNewTitle = (pageId: string = "") => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async ({ newTitle }: NewTitleMutate) => {
      return await requestAPI(`pages/${pageId}`, "PATCH", { title: newTitle });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["pages"] }),
  });
  return mutate;
};

export const usePatchBlockData = (pageId: string = "") => { // 수정중
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async ({ endpoint, data }: { endpoint: string; data: PatchBlockMutate }) => {
      return await requestAPI(endpoint, "PATCH", data);
    },
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [`pages/${pageId}`] });
    },
  });

  return mutate;
};

export const usePatchBlock = (pageId: string = "") => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async ({ newData, blockId }: NewBlockMutate) => {
      return await requestAPI(
        `pages/${pageId}/blocks/${blockId}`,
        "PATCH",
        newData
      );
    }, 
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [`pages/${pageId}`] }),
  });
  return mutate;
};

export const usePatchBlockContent = (pageId: string = "") => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async ({ newContent, blockId }: BlockContentMutate) => {
      return await requestAPI(`pages/${pageId}/blocks/${blockId}`, "PATCH", {
        content: newContent,
      });
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [`pages/${pageId}`] }),
  });
  return mutate;
};

export const usePatchBlockOrder = (pageId: string = "") => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async ({ newData }: BlockOrderMutate) => {
      return await requestAPI(`pages/${pageId}/blocks`, "PATCH", {
        blocks: newData,
      });
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [`pages/${pageId}`] }),
  });
  return mutate;
};

/**
 *
 * @param endpoint
 * @param newData
 * @url ${server}/${endpoint}
 */

export const updateData = async (endpoint: string, newData: object) => {
  try {
    const response = await fetch(`${server}/${endpoint}`, {
      method: "PATCH",
      body: JSON.stringify(newData), // { title: newTitle } 이런식으로 사용
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log("Success:", newData, data);
  } catch (error) {
    console.error("Error:", error);
  }
};

/**
 *
 * @param endpoint
 * @url ${server}/${endpoint}
 */

export const deleteData = async (endpoint: string) => {
  try {
    const response = await fetch(`${server}/${endpoint}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("delete 실패!");
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

/**
 *
 * @param pageId
 * @param index
 * @url ${server}/pages/${pageId}/blocks
 */

export const createBlock = async (pageId: string, index: number) => {
  try {
    const response = await fetch(`${server}/pages/${pageId}/blocks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "p",
        content: "",
        index: index,
        children: [],
      }),
    });

    if (!response.ok) {
      throw new Error("실패 !");
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to create block:", error);
    throw error;
  }
};
