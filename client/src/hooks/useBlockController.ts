import { Block, BlockControllerProps, ParagraphBlock } from '../constants';
import { HandleInputProps } from '../components/EditableBlock';
import { generateRange } from '../helpers/cursorHelpers';
import { useCursorStore } from '../stores/useCursorStore';
import { useEffect, useRef } from 'react';

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

const isEmptyContent = (text: string | null) => {
  return text === '';
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
  const { setBlockOffset, setTextOffset } = useCursorStore();
  const { blockOffset, textOffset } = useCursorStore();
  const blockControllerRef = useRef<HTMLDivElement | null>(null);

  const handleInput = ({
    e: {
      key,
      shiftKey,
      currentTarget: { textContent },
    },
    index: blockIndex,
    itemIndex,
  }: HandleInputProps) => {
    let newBlocks = [...blocks];
    const block = newBlocks[blockIndex];
    const newOffset = generateRange()?.startOffset || 0;

    if (key === 'Backspace' && isEmptyContent(textContent)) {
      const newBlockIndex = blockIndex < 1 ? 0 : blockIndex - 1;

      newBlocks = removeBlock(blocks, blockIndex);
      setBlocks(newBlocks);
      setBlockOffset(newBlockIndex);
      setTextOffset(Infinity);
      handleFetch(newBlocks, true);
      return;
    }

    if (key === 'Enter' && shiftKey) {
      const newTextOffset = newOffset ? newOffset + 1 : 0;

      newBlocks = insertLineBreak(blocks, blockIndex, newOffset);
      setBlocks(newBlocks);
      setTextOffset(newTextOffset);
      handleFetch(newBlocks);
      return;
    }

    if (key === 'Enter') {
      const newBlockOffset = blockIndex + 1;
      const newTextOffset = 0;

      newBlocks = addNewBlock(blocks, blockIndex);
      setBlocks(newBlocks);
      setBlockOffset(newBlockOffset);
      setTextOffset(newTextOffset);
      handleFetch(newBlocks, true);
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

    setBlockOffset(blockIndex);
    setTextOffset(newOffset);

    handleContentChange(newBlocks);
  };

  useEffect(() => {
    const blockNodes = blockControllerRef.current?.querySelectorAll('[contenteditable="true"]');

    if (!blockNodes || blockNodes.length === 0) return;

    const selection = window.getSelection();
    if (!selection) return;

    const newNode = [...blockNodes][blockOffset];
    if (!newNode) return;

    const nodeLength = newNode.textContent?.length || 0;
    const newOffset = Math.min(textOffset, nodeLength);

    if (newOffset < 0 || newOffset > nodeLength) return;

    if (newNode.childNodes.length > 0) {
      selection.setPosition(newNode.childNodes[0], newOffset);
    } else {
      selection.setPosition(newNode, newOffset);
    }
  }, [blocks]);

  return { blockControllerRef, handleInput };
}
