const server = import.meta.env.VITE_SERVER_URL;

/**
 * 
 * @param parent_id
 * @url ${server}/pages
 */

export const createNewPage = async (parent_id = "") => {
  try {
    const response = await fetch(`${server}/pages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "",
        blocklist: [],
        parent_id,
      }),
    });
    if (!response.ok) {
      console.log("실패 !");
    }
  } catch (error) {
    console.error("Failed to submit new Pages:", error);
  }
};

/**
 * 
 * @param endpoint
 * @url ${server}/${endpoint}
 */

export const fetchData = async (endpoint: string) => {
  try {
    const response = await fetch(`${server}/${endpoint}`);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
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
    console.log("Success:", data);
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
        type: "text",
        content: "",
        index: index,
        children: []
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
