import styled from 'styled-components';
import { RowGap, SideMenu } from '../../styles/themes';
import { useQueryClient } from '@tanstack/react-query';
import { useDeleteArticleMutation, useNewArticleMutation } from '@/hooks/mutationHooks';
import { useNavigate } from 'react-router-dom';

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
          <IconImage src={''} />
          <span>{title}</span>
        </RowGap>
        <button onClick={() => fetchNewArticle({ teamspaceId })}>+</button>
      </SideMenu>
      {articles.map(({ _id: articleId, title: articleTitle, icon }, index) => (
        <SideMenu
          key={`sidemenu-article-${index}`}
          onClick={() => navigate(`/teamspace/${teamspaceId}/article/${articleId}`)}
        >
          <RowGap>
            <IconImage src={icon} />
            <span>{articleTitle}</span>
          </RowGap>
          <button onClick={() => deleteArticle({ teamspaceId, articleId })}>x</button>
        </SideMenu>
      ))}
    </>
  );
}

const IconImage = styled.img`
  margin-left: 24px;
`;
