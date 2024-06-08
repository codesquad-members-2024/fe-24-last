import styled from 'styled-components';
import BlockController from './BlockController';
import useArticle from '../hooks/useArticle';

export default function Article() {
  const { blocks, setBlocks, debouncedFetch, handleContentChange } = useArticle();

  return (
    <Wrapper>
      <ContentBox>
        <BlockController
          blocks={blocks}
          setBlocks={setBlocks}
          handleFetch={debouncedFetch}
          handleContentChange={handleContentChange}
        />
      </ContentBox>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  /* justify-content: center; */
`;

const ContentBox = styled.div`
  width: 708px;
  display: flex;
`;
