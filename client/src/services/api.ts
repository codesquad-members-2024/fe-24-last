import { ElementIndexInfo } from "../model/types";

export async function getArticles() {
  const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/articles`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}

export async function getArticleById(id?: string) {
  const response = await fetch(
    `${import.meta.env.VITE_SERVER_URL}/articles/${id}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch article");
  }
  return response.json();
}

export async function postNewArticle() {
  const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/articles`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: "",
      blockList: [
        {
          columnList: [
            [{ type: "text", content: "안녕" }],
            [{ type: "text", content: "빙수" }],
          ],
        },
        {
          columnList: [[{ type: "text", content: "" }]],
        },
        {
          columnList: [
            [
              { type: "text", content: "때구" },
              { type: "text", content: "째굼이" },
            ],
            [
              { type: "text", content: "초코" },
              { type: "text", content: "딸기" },
            ],
            [
              { type: "text", content: "치즈" },
              { type: "text", content: "빙수" },
            ],
          ],
        },
      ],
      parent_id: "",
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to create a new article");
  }

  return response.json();
}

export async function deleteArticle(articleId: string) {
  const response = await fetch(
    `${import.meta.env.VITE_SERVER_URL}/articles/${articleId}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to delete article");
  }

  return response.json();
}

export async function patchArticleTitle(
  id: string | undefined,
  newTitle: string
) {
  const response = await fetch(
    `${import.meta.env.VITE_SERVER_URL}/articles/${id}`,
    {
      method: "PATCH",
      body: JSON.stringify({ title: newTitle }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to save title");
  }

  return response.json();
}

interface PatchElementContentParams {
  articleId: string;
  type?: string | undefined;
  newContent?: string | undefined;
  elementIndexInfo: ElementIndexInfo;
}

export async function patchElement({
  articleId,
  type,
  newContent,
  elementIndexInfo,
}: PatchElementContentParams) {
  const response = await fetch(
    `${import.meta.env.VITE_SERVER_URL}/articles/${articleId}/element`,
    {
      method: "PATCH",
      body: JSON.stringify({ type, content: newContent, elementIndexInfo }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(
      `Failed to update block content: ${
        errorResponse.error || response.statusText
      }`
    );
  }
  return response.json();
}

//필요없으면 삭제
export async function updateElementType(
  articleId: string | undefined,
  blockId: string | undefined,
  elementId: string | undefined,
  newType: string
) {
  const response = await fetch(
    `${
      import.meta.env.VITE_SERVER_URL
    }/articles/${articleId}/block/${blockId}/element/${elementId}`,
    {
      method: "PATCH",
      body: JSON.stringify({ type: newType }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(
      `Failed to update block content: ${
        errorResponse.error || response.statusText
      }`
    );
  }
  return response.json();
}

export async function postNewBlockOrElement(
  articleId: string,
  targetIndexInfo: Partial<ElementIndexInfo>
) {
  const bodyData = {
    blockIndex: targetIndexInfo.blockIndex,
    columnIndex: targetIndexInfo.columnIndex,
    elementIndex: targetIndexInfo.elementIndex,
  };

  const response = await fetch(
    `${import.meta.env.VITE_SERVER_URL}/articles/${articleId}/blockOrElement`,
    {
      method: "POST",
      body: JSON.stringify(bodyData),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to create new block or Element");
  }

  return response.json();
}

export async function deleteElement(
  articleId: string | undefined,
  elementIndexInfo: ElementIndexInfo
) {
  const response = await fetch(
    `${import.meta.env.VITE_SERVER_URL}/articles/${articleId}/element`,
    {
      method: "DELETE",
      body: JSON.stringify(elementIndexInfo),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to delete Element");
  }

  return response.json();
}

export async function patchElementIndex(
  articleId: string | undefined,
  elementIndexInfo: ElementIndexInfo,
  targetIndexInfo: Partial<ElementIndexInfo>
) {
  const response = await fetch(
    `${import.meta.env.VITE_SERVER_URL}/articles/${articleId}/element/move`,
    {
      method: "PATCH",
      body: JSON.stringify({ elementIndexInfo, targetIndexInfo }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to move element");
  }

  return response.json();
}
