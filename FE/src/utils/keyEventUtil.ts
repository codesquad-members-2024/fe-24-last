import { Dispatch, SetStateAction, KeyboardEvent } from 'react';
import { BlockType } from '../pages/SideBar';
import moveCursorToStartEnd from './MoveCursorToStartEnd';

interface EventParams {
    e: KeyboardEvent<HTMLDivElement>;
    index: number;
    setBlocks: Dispatch<SetStateAction<BlockType[]>>;
    updateBlock: BlockType[];
    currentBlockIdx: React.MutableRefObject<number | null>;
}
interface ArrowEventParams {
    e: KeyboardEvent<HTMLDivElement>;
    index: number;
}

const newBlock: BlockType = {
    type: "text",
    content: "",
    children: [],
};


export const keyEvent = {
    enterEvent({e, setBlocks, updateBlock, currentBlockIdx, index}: EventParams) {
        e.preventDefault();
        updateBlock.splice(index + 1, 0, newBlock);
        setBlocks(updateBlock);
        currentBlockIdx.current = index + 1;
    },
    backspaceEvent({e, setBlocks, updateBlock, currentBlockIdx, index}: EventParams){
        e.preventDefault();
        updateBlock.splice(index, 1);
        setBlocks(updateBlock);
        currentBlockIdx.current = index - 1;
    },
    arrowUpEvent({e, index}: ArrowEventParams){
        e.preventDefault();
        const prevBlock = document.querySelector<HTMLDivElement>(
            `[data-position="${index - 1}"]`
        );
        if (prevBlock) {
            setTimeout(
                () => moveCursorToStartEnd(prevBlock, false),
                0
            );
            prevBlock.focus();
        }
    },
    arrowDownEvent({e, index}: ArrowEventParams) {
        e.preventDefault();
        const nextBlock = document.querySelector<HTMLDivElement>(
            `[data-position="${index + 1}"]`
        );
        if (nextBlock) {
            moveCursorToStartEnd(nextBlock, false);
            nextBlock.focus();
        }
    },
    arrowRightEvent({e, index}: ArrowEventParams) {
        e.preventDefault();
        const nextBlock = document.querySelector<HTMLDivElement>(
            `[data-position="${index + 1}"]`
        );
        if (nextBlock) {
            nextBlock.focus();
            setTimeout(
                () => moveCursorToStartEnd(nextBlock, true),
                0
            );
        }
    },
    arrowLeftEvent({e, index}: ArrowEventParams){
        e.preventDefault();
        const prevBlock = document.querySelector<HTMLDivElement>(
            `[data-position="${index - 1}"]`
        );
        if (prevBlock) {
            prevBlock.focus();
            setTimeout(
                () => moveCursorToStartEnd(prevBlock, false),
                0
            );
        }
    }
}