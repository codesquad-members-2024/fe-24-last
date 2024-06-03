import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { fetchArticleById } from '../api/fetchArticle';
import EditableBlock from './EditableBlock';

const FIRST_PAGE = 1;

export default function Article() {
  const [articleBlocks, setArticleBlocks] = useState<string[]>([]);

  useEffect(() => {
    fetchArticleById(FIRST_PAGE).then((data) => {
      const contents = data.content.split('\n');
      setArticleBlocks(contents);
    });
  }, []);

  return (
    <ArticleContainer>
      {articleBlocks && articleBlocks.map((articleBlock) => <EditableBlock>{articleBlock}</EditableBlock>)}
    </ArticleContainer>
  );
}

const ArticleContainer = styled.div`
  background-color: aliceblue;
  width: 100vw;
  height: 100vh;
`;
