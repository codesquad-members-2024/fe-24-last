import styled from 'styled-components';
import { SideMenu } from '../../styles/themes';

interface ArticleDescription {
  id: number;
  title: string;
  icon: string;
}

export interface TeamspaceProps {
  id: number;
  title: string;
  articles: ArticleDescription[];
}

export default function Teamspace({ title, articles }: TeamspaceProps) {
  return (
    <>
      <SideMenu>
        <div></div>
        <span>{title}</span>
      </SideMenu>
      {articles.map(({ title: articleTitle, icon }) => (
        <SideMenu>
          <IconImage src={icon} />
          <span>{articleTitle}</span>
        </SideMenu>
      ))}
    </>
  );
}

const IconImage = styled.img`
  margin-left: 24px;
`;
