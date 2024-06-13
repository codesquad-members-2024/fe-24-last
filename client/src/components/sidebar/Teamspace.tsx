import styled from 'styled-components';
import { SideMenu } from '../../styles/themes';

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

export default function Teamspace({ title, articles }: TeamspaceProps) {
  return (
    <>
      <SideMenu>
        <div></div>
        <span>{title}</span>
      </SideMenu>
      {articles.map(({ title: articleTitle, icon }, index) => (
        <SideMenu key={`sidemenu-article-${index}`}>
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
