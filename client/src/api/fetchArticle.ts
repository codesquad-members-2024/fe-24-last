const SERVER = import.meta.env.VITE_SERVER;

const UNKNOWN_ERROR_MESSAGE = "알 수 없는 에러가 발생하였습니다.";

export const fetchArticleById = async (id: number) => {
  try {
    const response = await fetch(`${SERVER}/api/article/${id}`);

    if (!response.ok) throw new Error(`HTTP Error! Status Code: ${response.status}`);

    return response.json();
  } catch (error) {
    const message = error instanceof Error ? error.message : UNKNOWN_ERROR_MESSAGE;
    throw new Error(message);
  }
};
