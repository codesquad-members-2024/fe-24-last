export async function fetchArticles() {
  const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/pages`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}

export async function createNewPage() {
  const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/pages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: "",
      blocklist: [
        {
          element: [
            [{ type: "text", content: "안녕" }],
            [{ type: "text", content: "빙수" }],
          ],
        },
        {
          element: [[{ type: "text", content: "" }]],
        },
        {
          element: [
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
    throw new Error("Failed to create a new page");
  }

  return response.json();
}

export async function deletePage(pageId: string) {
  const response = await fetch(
    `${import.meta.env.VITE_SERVER_URL}/pages/${pageId}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to delete page");
  }

  return response.json();
}

export async function fetchArticleById(id: string | undefined) {
  const response = await fetch(
    `${import.meta.env.VITE_SERVER_URL}/pages/${id}`
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
    `${import.meta.env.VITE_SERVER_URL}/pages/${id}`,
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
  pageId: string | undefined,
  blockId: string | undefined,
  elementId: string | undefined,
  newContent: string
) {
  const response = await fetch(
    `${
      import.meta.env.VITE_SERVER_URL
    }/pages/${pageId}/block/${blockId}/element/${elementId}`,
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
  pageId: string | undefined,
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
    }/pages/${pageId}/block/${blockId}/element`,
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
  pageId: string | undefined,
  blockId: string | undefined,
  elementId: string | undefined
) {
  const response = await fetch(
    `${
      import.meta.env.VITE_SERVER_URL
    }/pages/${pageId}/block/${blockId}/element/${elementId}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to delete block");
  }

  return response.json();
}
