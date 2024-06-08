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
  const handleInput = (
    { key, currentTarget: { textContent } }: KeyboardEvent<HTMLElement>,
    blockIndex: number,
    itemIndex?: number
  ) => {
    let newBlocks = [...blocks];
    const block = newBlocks[blockIndex];

    if (key === 'Backspace' && isBlankBlock(block)) {
      newBlocks = removeBlock(blocks, blockIndex);
      setBlocks(newBlocks);
      handleFetch(newBlocks);
      return;
    }

    if (key === 'Enter') {
      newBlocks = addNewBlock(blocks, blockIndex);
      setBlocks(newBlocks);
      handleFetch(newBlocks);
      return;
    }

    if ((itemIndex === undefined || itemIndex < 0) && 'content' in block) {
      newBlocks[blockIndex] = { ...block, content: textContent || '' } as typeof block;
    }

    if ('items' in block && block.items.length > 0) {
      const updatedItems = block.items.map((item, idx) =>
        idx === itemIndex ? { type: 'ol-item', content: textContent } : item
      );
      newBlocks[blockIndex] = { ...block, items: updatedItems } as typeof block;
    }

    handleContentChange(newBlocks[blockIndex], blockIndex);
  };

  return { handleInput };
}
