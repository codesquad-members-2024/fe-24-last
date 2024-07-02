import styled from 'styled-components';
import BlockController from './BlockController';
import useArticle from '../../hooks/useArticle';
import { Flex } from '../../styles/themes';
import React, { KeyboardEvent, useCallback, useState } from 'react';
import { debounce } from '@/utils/timeoutUtils';
import { useUpdateArticleMutation } from '@/hooks/mutationHooks';
import { useParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

interface DraggingBoxProps {
  $top: number;
  $left: number;
  width: number;
  height: number;
}

export default function Article() {
  const client = useQueryClient();
  const { teamspaceId, articleId } = useParams();
  const { title = '', clientBlocksRef, blocks, setBlocks, debouncedFetch } = useArticle();
  const [isDragging, setIsDragging] = useState(false);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  const [currentPosition, setCurrentPosition] = useState({ x: 0, y: 0 });

  const successFn = () =>
    client.invalidateQueries({
      queryKey: ['teamspace', `${teamspaceId}`],
    });

  const { updateArticle } = useUpdateArticleMutation({ successFn });

  const handleMouseDown = ({ clientX, clientY }: React.MouseEvent) => {
    setIsDragging(true);
    setStartPosition({ x: clientX - 240, y: clientY });
    setCurrentPosition({ x: clientX - 240, y: clientY });
  };

  const handleMouseMove = ({ clientX, clientY }: React.MouseEvent) => {
    if (isDragging) setCurrentPosition({ x: clientX - 240, y: clientY });
  };

  const handleMouseUp = () => setIsDragging(false);

  const debounceTitleFetch = useCallback(
    debounce((title: string) => {
      updateArticle({ teamspaceId, articleId, title });
    }, 1000),
    [teamspaceId, articleId]
  );

  const handleTitleChange = ({ currentTarget: { textContent } }: KeyboardEvent<HTMLElement>) => {
    debounceTitleFetch(textContent);
  };

  return (
    <Wrapper onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
      <ContentBox>
        <Title contentEditable onKeyUp={(e) => handleTitleChange(e)}>
          {title}
        </Title>
        <BlockController
          clientBlockRef={clientBlocksRef}
          blocks={blocks}
          setBlocks={setBlocks}
          handleFetch={debouncedFetch}
        />
      </ContentBox>
      {isDragging && (
        <DraggingBox
          $top={Math.min(startPosition.y, currentPosition.y)}
          $left={Math.min(startPosition.x, currentPosition.x)}
          width={Math.abs(startPosition.x - currentPosition.x)}
          height={Math.abs(startPosition.y - currentPosition.y)}
        />
      )}
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
  flex-direction: column;
  align-items: center;
  transition: all 0.3s ease-in-out 0.5s;
`;

const Title = styled.h1`
  margin-left: 40px;
  text-align: left;
`;

const ContentBox = styled.div`
  width: 708px;
  display: flex;
  flex-direction: column;
`;

const DraggingBox = styled.div<DraggingBoxProps>`
  position: absolute;

  ${({ $top, $left, width, height }) => `
    top: ${$top}px;
    left: ${$left}px;
    width: ${width}px;
    height: ${height}px;
  `}

  border: 2px solid rgba(132, 198, 255, 0.3);
  background-color: rgba(132, 198, 255, 0.3);
  pointer-events: none;
  z-index: 1000;
`;
