import { KeyboardEvent } from 'react';
import { BlockType } from '../pages/SideBar';
import moveCursorToStartEnd from './MoveCursorToStartEnd';

interface EventParams {
    e: KeyboardEvent<HTMLDivElement>;
    index: number;
    blocks: React.MutableRefObject<BlockType[]>;
    updateBlock: BlockType[];
    setCurrentBlockIdx: React.Dispatch<React.SetStateAction<number | null>>;
}
interface ArrowEventParams {
    e: KeyboardEvent<HTMLDivElement>;
    index: number;
}

const newBlock: BlockType = {
    type: "p",
    content: "",
    children: [],
};


export const keyEvent = {
    enterEvent({e, blocks, updateBlock, setCurrentBlockIdx, index}: EventParams) {
        e.preventDefault();
        updateBlock.splice(index + 1, 0, newBlock);
        blocks.current = updateBlock;
        setCurrentBlockIdx (index + 1);
    },
    backspaceEvent({e, blocks, updateBlock, setCurrentBlockIdx, index}: EventParams){
        e.preventDefault();
        updateBlock.splice(index, 1);
        blocks.current = updateBlock;
        setCurrentBlockIdx(index - 1);
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
        }
    },
    arrowDownEvent({e, index}: ArrowEventParams) {
        e.preventDefault();
        const nextBlock = document.querySelector<HTMLDivElement>(
            `[data-position="${index + 1}"]`
        );
        if (nextBlock) {
            moveCursorToStartEnd(nextBlock, false);
        }
    },
    arrowRightEvent({e, index}: ArrowEventParams) {
        e.preventDefault();
        const nextBlock = document.querySelector<HTMLDivElement>(
            `[data-position="${index + 1}"]`
        );
        if (nextBlock) {
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
            setTimeout(
                () => moveCursorToStartEnd(prevBlock, false),
                0
            );
        }
    }
}