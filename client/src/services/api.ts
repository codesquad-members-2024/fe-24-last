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
          type: "text",
          content: "",
          children: [],
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

export async function fetchArticleById(id: string | undefined) {
  const response = await fetch(
    `${import.meta.env.VITE_SERVER_URL}/pages/${id}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch article");
  }
  return response.json();
}

export const updateArticleTitle = async (
  id: string | undefined,
  newTitle: string
) => {
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
};

export const updateBlockContent = async (
  pageId: string | undefined,
  blockId: string | undefined,
  newContent: string
) => {
  const response = await fetch(
    `${import.meta.env.VITE_SERVER_URL}/pages/${pageId}/block/${blockId}`,
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
};
