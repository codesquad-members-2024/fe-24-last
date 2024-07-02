import { RowGap, SideMenu } from '../../styles/themes';
import { useQueryClient } from '@tanstack/react-query';
import { useDeleteArticleMutation, useNewArticleMutation } from '@/hooks/mutationHooks';
import { useNavigate } from 'react-router-dom';
import { CopyFilled, DatabaseFilled } from '@ant-design/icons';

interface ArticleDescription {
  _id: string;
  title: string;
  icon: string;
}

export interface TeamspaceProps {
  _id: string;
  title: string;
  articles: ArticleDescription[];
}

export default function Teamspace({ _id: teamspaceId, title, articles }: TeamspaceProps) {
  const client = useQueryClient();
  const navigate = useNavigate();
  const successFn = () => client.invalidateQueries({ queryKey: ['teamspace', `${teamspaceId}`] });
  const { fetchNewArticle } = useNewArticleMutation({ successFn });
  const { deleteArticle } = useDeleteArticleMutation({ successFn });

  return (
    <>
      <SideMenu>
        <RowGap>
          <DatabaseFilled />
          <span>{title}</span>
        </RowGap>
        <button onClick={() => fetchNewArticle({ teamspaceId })}>+</button>
      </SideMenu>
      {articles.map(({ _id: articleId, title: articleTitle }, index) => (
        <SideMenu
          key={`sidemenu-article-${index}`}
          onClick={() => navigate(`/teamspace/${teamspaceId}/article/${articleId}`)}
        >
          <RowGap>
            <CopyFilled />
            <span>{articleTitle}</span>
          </RowGap>
          <button onClick={() => deleteArticle({ teamspaceId, articleId })}>x</button>
        </SideMenu>
      ))}
    </>
  );
}
