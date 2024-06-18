import { Block } from '../constants';

interface ArticleRequestProps {
  teamspaceId: string | undefined;
  articleId: string | undefined;
}

interface UpdateArticleProps extends ArticleRequestProps {
  blocks: Block[];
}

const SERVER = import.meta.env.VITE_SERVER;

const UNKNOWN_ERROR_MESSAGE = '알 수 없는 에러가 발생하였습니다.';

export const sendArticleRequestById = async ({ teamspaceId = '', articleId = '' }: ArticleRequestProps) => {
  try {
    const response = await fetch(`${SERVER}/api/teamspace/${teamspaceId}/article/${articleId}`);

    if (!response.ok) throw new Error(UNKNOWN_ERROR_MESSAGE);

    return response.json();
  } catch (error) {
    console.error(error);
  }
};

export const updateArticleRequestById = async ({
  teamspaceId = '',
  articleId = '',
  blocks = [],
}: UpdateArticleProps) => {
  try {
    const response = await fetch(`${SERVER}/api/teamspace/${teamspaceId}/article/${articleId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content: blocks }),
    });

    if (!response.ok) throw new Error(UNKNOWN_ERROR_MESSAGE);

    return response.json();
  } catch (error) {
    console.error(error);
  }
};
