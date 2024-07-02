import { Block, ParagraphBlock } from '@/constants';
import { removeBlock } from '@/hooks/useKeyEvent';
import { MutableRefObject } from 'react';
import { generateRange } from './cursorHelpers';

const isEmptyContent = (text: string | null) => text === '';

type HandleInputActionProps = {
  blocks: Block[];
  setBlocks: (blocks: Block[]) => void;
  setBlockOffset: (blockOffset: number) => void;
  setTextOffset: (textOffset: number) => void;
  clientBlockRef: MutableRefObject<Block[]>;
  handleFetch: (blocks: Block[], option?: boolean | undefined) => void;
  textContent: string | null;
  blockIndex: number;
  shiftKey: boolean;
  key: string | '';
};

const insertLineBreak = (blocks: Block[], blockIndex: number, offset: number = 0): Block[] => {
  const block = blocks[blockIndex];
  if (block.type === 'paragraph') {
    const previousArr = blocks.slice(0, blockIndex);
    const nextArr = blocks.slice(blockIndex + 1);

    const prevContent = block.content.slice(0, offset);
    const nextContent = block.content.slice(offset);
    const breakLine = nextContent ? '\n' : '\n\n';
    const lineBreakContent = `${prevContent}${breakLine}${nextContent}`;

    const array = [...previousArr, { type: 'paragraph', content: lineBreakContent } as ParagraphBlock, ...nextArr];
    return array;
  }
  return [];
};

const addNewBlock = (blocks: Block[], blockIndex: number) => {
  const previousArr = blocks.slice(0, blockIndex + 1);
  const nextArr = blocks.slice(blockIndex + 1);
  const array = [...previousArr, { type: 'paragraph', content: '' } as ParagraphBlock, ...nextArr];

  return array;
};

export const handleBackspace = ({
  blocks,
  setBlocks,
  setBlockOffset,
  setTextOffset,
  clientBlockRef,
  handleFetch,
  textContent,
  blockIndex,
}: HandleInputActionProps) => {
  if (!isEmptyContent(textContent)) return;

  const newBlockIndex = blockIndex < 1 ? 0 : blockIndex - 1;
  const newBlocks = removeBlock(blocks, blockIndex);
  setBlocks(newBlocks);
  setBlockOffset(newBlockIndex);
  setTextOffset(Infinity);
  clientBlockRef.current = newBlocks;
  handleFetch(newBlocks, true);
};

export const handleEnter = ({
  setBlockOffset,
  setTextOffset,
  clientBlockRef,
  handleFetch,
  blockIndex,
  shiftKey,
}: HandleInputActionProps) => {
  const newOffset = generateRange()?.startOffset || 0;

  const newTextOffset = shiftKey ? newOffset + 1 : 0;
  const newBlockOffset = shiftKey ? blockIndex : blockIndex + 1;

  const newBlocks = shiftKey
    ? insertLineBreak(clientBlockRef.current, blockIndex, newOffset)
    : addNewBlock(clientBlockRef.current, blockIndex);

  clientBlockRef.current = newBlocks;
  setBlockOffset(newBlockOffset);
  setTextOffset(newTextOffset);
  handleFetch(newBlocks, true);
};

const actionByInputKey: { [key: string]: (props: HandleInputActionProps) => void } = {
  Backspace: handleBackspace,
  Enter: handleEnter,
};

export const handleInputAction = (key: string) => {
  if (!(key in actionByInputKey)) return;

  return actionByInputKey[key];
};
