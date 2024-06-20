import styled, { css } from 'styled-components';
import BlockController from '../BlockController';
import useArticle from '../../hooks/useArticle';
import { Flex } from '../../styles/themes';
import React, { useState } from 'react';

interface DraggingBoxProps {
  $top: number;
  $left: number;
  width: number;
  height: number;
}

export default function Article() {
  const { clientBlocksRef, blocks, setBlocks, debouncedFetch } = useArticle();
  const [isDragging, setIsDragging] = useState(false);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  const [currentPosition, setCurrentPosition] = useState({ x: 0, y: 0 });

  const handleMouseDown = ({ clientX, clientY }: React.MouseEvent) => {
    setIsDragging(true);
    setStartPosition({ x: clientX - 240, y: clientY });
    setCurrentPosition({ x: clientX - 240, y: clientY });
  };

  const handleMouseMove = ({ clientX, clientY }: React.MouseEvent) => {
    if (isDragging) setCurrentPosition({ x: clientX - 240, y: clientY });
  };

  const handleMouseUp = () => setIsDragging(false);

  return (
    <Wrapper onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
      <ContentBox>
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
  justify-content: center;
  transition: all 0.3s ease-in-out 0.5s;
`;

const ContentBox = styled.div`
  width: 708px;
  display: flex;
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
