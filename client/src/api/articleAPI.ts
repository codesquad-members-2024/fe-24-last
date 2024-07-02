import { ARTICLE_PATH, Block, TEAMSPACE_PATH } from '../constants';

interface ArticleRequestProps {
  teamspaceId: string | undefined;
  articleId: string | undefined;
}

interface UpdateArticleProps extends ArticleRequestProps {
  blocks?: Block[];
  title?: string;
}

const SERVER = import.meta.env.VITE_SERVER;

const UNKNOWN_ERROR_MESSAGE = '알 수 없는 에러가 발생하였습니다.';

export const sendArticleRequestById = async ({ teamspaceId = '', articleId = '' }: ArticleRequestProps) => {
  try {
    const response = await fetch(`${SERVER}${TEAMSPACE_PATH}/${teamspaceId}${ARTICLE_PATH}/${articleId}`);

    if (!response.ok) throw new Error(UNKNOWN_ERROR_MESSAGE);

    return response.json();
  } catch (error) {
    console.error(error);
  }
};

export const postNewArticle = async ({ teamspaceId = '' }: { teamspaceId: string }) => {
  try {
    const response = await fetch(`${SERVER}${TEAMSPACE_PATH}/${teamspaceId}${ARTICLE_PATH}`, {
      method: 'POST',
    });

    if (!response.ok) throw new Error(UNKNOWN_ERROR_MESSAGE);

    return response;
  } catch (error) {
    console.error(error);
  }
};

export const updateArticleRequestById = async ({
  teamspaceId = '',
  articleId = '',
  blocks: content,
  title,
}: UpdateArticleProps) => {
  try {
    const response = await fetch(`${SERVER}${TEAMSPACE_PATH}/${teamspaceId}${ARTICLE_PATH}/${articleId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, content }),
    });

    if (!response.ok) throw new Error(UNKNOWN_ERROR_MESSAGE);

    return response.json();
  } catch (error) {
    console.error(error);
  }
};

export const sendArticleDeleteRequest = async ({ teamspaceId = '', articleId = '' }) => {
  try {
    const response = await fetch(`${SERVER}${TEAMSPACE_PATH}/${teamspaceId}${ARTICLE_PATH}/${articleId}`, {
      method: 'DELETE',
    });

    if (!response.ok) throw new Error(UNKNOWN_ERROR_MESSAGE);

    return response;
  } catch (error) {
    console.error(error);
  }
};
