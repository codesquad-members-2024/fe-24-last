import { HandleInputProps } from '@/components/article/EditableBlock';
import { Block } from '@/constants';
import { generateRange } from '@/helpers/cursorHelpers';
import { handleInputAction } from '@/helpers/keyEventHelpers';
import { useCursorStore } from '@/stores/useCursorStore';
import { MutableRefObject } from 'react';

interface KeyEventHookProps {
  blocks: Block[];
  setBlocks: (blocks: Block[]) => void;
  clientBlockRef: MutableRefObject<Block[]>;
  handleFetch: (blocks: Block[], option?: boolean) => void;
}

export const removeBlock = (blocks: Block[], blockIndex: number) => {
  const previousArr = blocks.slice(0, blockIndex);
  const nextArr = blocks.slice(blockIndex + 1);
  const removedArray = [...previousArr, ...nextArr];

  if (removedArray.length === 0) return blocks;

  return removedArray;
};

export default function useKeyEvent({ blocks, setBlocks, clientBlockRef, handleFetch }: KeyEventHookProps) {
  const { setBlockOffset, setTextOffset } = useCursorStore();

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

    const handleInputActionProps = {
      blocks,
      setBlocks,
      setBlockOffset,
      setTextOffset,
      clientBlockRef,
      handleFetch,
      textContent,
      blockIndex,
      shiftKey,
      key,
    };

    const actionByInputKey = handleInputAction(key);

    if (actionByInputKey) {
      actionByInputKey(handleInputActionProps);
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

    clientBlockRef.current = newBlocks;
    setBlockOffset(blockIndex);
    setTextOffset(newOffset);
    handleFetch(newBlocks);
  };

  return { handleInput };
}
