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
    blocks?: React.MutableRefObject<BlockType[]> | undefined;
    range?: Range | null;
    curBlock?: HTMLDivElement | null;
}

const NEW_BLOCK: BlockType = {
    type: "p",
    content: "",
    children: [],
};

export type KeyEventParams = EventParams | ArrowEventParams;

export const keyEvent = {
    Enter({e, blocks, updateBlock, setCurrentBlockIdx, index}: EventParams) {
        e.preventDefault();
        updateBlock.splice(index + 1, 0, NEW_BLOCK);
        blocks.current = updateBlock;
        setCurrentBlockIdx (index + 1);
    },
    Backspace({e, blocks, updateBlock, setCurrentBlockIdx, index}: EventParams){
        if (index > 0 && !blocks.current[index].content){
            e.preventDefault();
            updateBlock.splice(index, 1);
            blocks.current = updateBlock;
            setCurrentBlockIdx(index - 1);
        }
    },
    ArrowUp({e, index}: ArrowEventParams){
        if (index > 0){
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
    },
    ArrowDown({e, index, blocks}: ArrowEventParams) {
        if(blocks &&  index < blocks.current.length - 1){
            e.preventDefault();
            const nextBlock = document.querySelector<HTMLDivElement>(
                `[data-position="${index + 1}"]`
            )
            if (nextBlock) {
                moveCursorToStartEnd(nextBlock, false);
            }
        }
    },
    ArrowRight({ e, index, range, curBlock, blocks }: ArrowEventParams) {
        if (range?.endOffset === curBlock?.textContent?.length && blocks && index < blocks.current.length - 1) {
            e.preventDefault();
            const nextBlock = document.querySelector<HTMLDivElement>(
                `[data-position="${index + 1}"]`
            );
            if (nextBlock) {
                setTimeout(() => moveCursorToStartEnd(nextBlock, true), 0);
            }
        }
    },
    ArrowLeft({e, index, range}: ArrowEventParams){
        if (range?.startOffset === 0 && index > 0) {
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
}