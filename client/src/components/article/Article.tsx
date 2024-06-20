import styled from 'styled-components';
import BlockController from './BlockController';
import useArticle from '../../hooks/useArticle';
import { Flex } from '../../styles/themes';

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

const Wrapper = styled(Flex)`
  position: fixed;
  top: 0;
  left: 240px;
  width: calc(100vw - 240px);
  height: 100vh;
  display: flex;
  justify-content: center;
  transition: all 0.3s ease-in-out 0.5s;
`;

const ContentBox = styled.div`
  width: 708px;
  display: flex;
`;
