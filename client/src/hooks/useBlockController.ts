import { Block, BlockControllerProps } from '../constants';
import { useCursorStore } from '../stores/useCursorStore';
import { useEffect, useRef } from 'react';
import useKeyEvent from './useKeyEvent';

export const removeBlock = (blocks: Block[], blockIndex: number) => {
  const previousArr = blocks.slice(0, blockIndex);
  const nextArr = blocks.slice(blockIndex + 1);
  const removedArray = [...previousArr, ...nextArr];

  return removedArray;
};

export default function useBlockController({ clientBlockRef, blocks, setBlocks, handleFetch }: BlockControllerProps) {
  const { blockOffset, textOffset } = useCursorStore();
  const blockControllerRef = useRef<HTMLDivElement | null>(null);
  const { handleInput } = useKeyEvent({ blocks, setBlocks, clientBlockRef, handleFetch });

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
