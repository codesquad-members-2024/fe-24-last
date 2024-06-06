import { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { sendArticleRequestById, updateArticleRequestById } from '../api/fetchArticle';
import { Block } from '../constants';
import { debounce } from 'lodash';
import BlockController from './BlockController';

const FIRST_PAGE = 1;

export default function Article() {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const clientBlocksRef = useRef<Block[]>([]);

  useEffect(() => {
    sendArticleRequestById(FIRST_PAGE).then(({ content }) => {
      setBlocks(content);
    });
  }, []);

  useEffect(() => {
    clientBlocksRef.current = blocks;
  }, [blocks]);

  const debouncedFetch = useCallback(
    debounce((updatedBlocks: Block[]) => {
      updateArticleRequestById(FIRST_PAGE, updatedBlocks).then(({ content }) => {
        setBlocks(content);
      });
    }, 1000),
    []
  );

  const handleContentChange = (updatedBlock: Block, index: number) => {
    const newBlocks = [...blocks];
    newBlocks[index] = updatedBlock;
    clientBlocksRef.current[index] = updatedBlock;
    setBlocks(clientBlocksRef.current);
    debouncedFetch(clientBlocksRef.current);
  };

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
  justify-content: center;
`;

const ContentBox = styled.div`
  width: 708px;
  display: flex;
`;
