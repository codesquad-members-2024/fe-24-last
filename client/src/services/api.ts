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
      blocklist: [],
      parent_id: "",
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to create a new page");
  }

  return response.json();
}
