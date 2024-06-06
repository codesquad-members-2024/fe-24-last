import { KeyboardEvent } from 'react';
import { Block, BlockControllerProps, ParagraphBlock } from '../constants';

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

export default function useBlockController({
  blocks,
  setBlocks,
  handleFetch,
  handleContentChange,
}: BlockControllerProps) {
  const handleInput = (e: KeyboardEvent<HTMLElement>, blockIndex: number, itemIndex?: number) => {
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
  return { handleInput };
}
