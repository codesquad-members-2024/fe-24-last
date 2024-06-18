import { Block, BlockControllerProps, ParagraphBlock } from '../constants';
import { HandleInputProps } from '../components/EditableBlock';
import { CursorPosition, storeCursorPosition } from '../helpers/cursorHelpers';
import { useCursorStore } from '../stores/cursorStore';

const insertLineBreak = (blocks: Block[], blockIndex: number, offset: number): Block[] => {
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
  const { setCursorPosition } = useCursorStore();
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
    const cursorPosition = storeCursorPosition() as CursorPosition;
    const { offset } = cursorPosition;

    if (key === 'Backspace' && isBlankBlock(block)) {
      const newCursorPosition = {
        ...cursorPosition,
        offset: Infinity,
        blockOffset: blockIndex < 1 ? 0 : blockIndex - 1,
      };

      newBlocks = removeBlock(blocks, blockIndex);
      setBlocks(newBlocks);
      handleFetch(newBlocks, newCursorPosition);
      return;
    }

    if (key === 'Enter' && shiftKey) {
      const newCursorPosition = { ...cursorPosition, offset: offset ? offset + 1 : 0 };

      newBlocks = insertLineBreak(blocks, blockIndex, offset); //?
      setBlocks(newBlocks);
      setCursorPosition(newCursorPosition);
      handleFetch(newBlocks, newCursorPosition);

      return;
    }

    if (key === 'Enter') {
      const newCursorPosition = { ...cursorPosition, blockOffset: blockIndex + 1 };

      newBlocks = addNewBlock(blocks, blockIndex);
      setBlocks(newBlocks);
      handleFetch(newBlocks, newCursorPosition);
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
