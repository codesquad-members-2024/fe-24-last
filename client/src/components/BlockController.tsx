import React from 'react';
import { Block, ParagraphBlock } from '../constants';
import styled from 'styled-components';
import EditableBlock from './EditableBlock';

interface BlockControllerProps {
  blocks: Block[];
  setBlocks: (blocks: Block[]) => void;
  handleFetch: (blocks: Block[]) => void;
  handleContentChange: (block: Block, index: number) => void;
}

const addNewBlock = (blocks: Block[], blockIndex: number) => {
  const previousArr = blocks.slice(0, blockIndex + 1);
  const nextArr = blocks.slice(blockIndex + 1);
  const array = [...previousArr, { type: 'paragraph', content: '' } as ParagraphBlock, ...nextArr];

  return array;
};

const isBlankBlock = (block: Block) => {
  if (!(block.type === 'paragraph')) return false;

  const { content } = block;
  return content === '';
};

const removeBlock = (blocks: Block[], blockIndex: number) => {
  const previousArr = blocks.slice(0, blockIndex);
  const nextArr = blocks.slice(blockIndex + 1);
  const removedArray = [...previousArr, ...nextArr];

  return removedArray;
};

export default function BlockController({ blocks, setBlocks, handleFetch, handleContentChange }: BlockControllerProps) {
  const handleInput = (e: React.KeyboardEvent<HTMLElement>, blockIndex: number, itemIndex?: number) => {
    let newBlocks = [...blocks];
    const block = newBlocks[blockIndex];

    if (e.key === 'Backspace' && isBlankBlock(block)) {
      newBlocks = removeBlock(blocks, blockIndex);
      setBlocks(newBlocks);
      handleFetch(newBlocks);
      return;
    }

    if (e.key === 'Enter') {
      newBlocks = addNewBlock(blocks, blockIndex);
      setBlocks(newBlocks);
      handleFetch(newBlocks);
      return;
    }

    if (!itemIndex || itemIndex < 1) {
      if ('content' in block) {
        const updatedBlock = { ...block, content: e.currentTarget.textContent || '' };
        newBlocks[blockIndex] = updatedBlock as typeof block;
      }
    } else {
      if ('items' in block) {
        const updatedItems = block.items.map((item, idx) =>
          idx === itemIndex ? e.currentTarget.textContent || '' : item
        );
        const updatedBlock = { ...block, items: updatedItems };
        newBlocks[blockIndex] = updatedBlock as typeof block;
      }
    }

    handleContentChange(newBlocks[blockIndex], blockIndex);
  };

  return (
    <BlocksWrapper>
      {blocks.map((block, index) => (
        <div key={index}>
          <EditableBlock block={block} index={index} handleInput={handleInput} />
        </div>
      ))}
    </BlocksWrapper>
  );
}

const BlocksWrapper = styled.div`
  width: 100%;
`;
