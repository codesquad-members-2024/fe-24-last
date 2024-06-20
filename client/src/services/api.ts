export async function fetchArticles() {
  const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/articles`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}

export async function createNewArticle() {
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

export async function fetchArticleById(id: string | undefined) {
  const response = await fetch(
    `${import.meta.env.VITE_SERVER_URL}/articles/${id}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch article");
  }
  return response.json();
}

export async function updateArticleTitle(
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

export async function updateBlockContent(
  articleId: string | undefined,
  blockId: string | undefined,
  elementId: string | undefined,
  newContent: string
) {
  const response = await fetch(
    `${
      import.meta.env.VITE_SERVER_URL
    }/articles/${articleId}/block/${blockId}/element/${elementId}`,
    {
      method: "PATCH",
      body: JSON.stringify({ content: newContent }),
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

export async function createNewBlockOrElement(
  articleId: string | undefined,
  blockId: string | undefined,
  columnIndex?: number,
  elementIndex?: number
) {
  const body =
    columnIndex !== undefined && elementIndex !== undefined
      ? { type: "text", content: "", columnIndex, elementIndex }
      : { type: "text", content: "" };
  const response = await fetch(
    `${
      import.meta.env.VITE_SERVER_URL
    }/articles/${articleId}/block/${blockId}/element`,
    {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to create new block");
  }

  return response.json();
}

export async function deleteBlock(
  articleId: string | undefined,
  blockId: string | undefined,
  elementId: string | undefined
) {
  const response = await fetch(
    `${
      import.meta.env.VITE_SERVER_URL
    }/articles/${articleId}/block/${blockId}/element/${elementId}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to delete block");
  }

  return response.json();
}
