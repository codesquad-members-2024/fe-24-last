import React, { useEffect } from 'react'
import BlockEditable from './BlockEditable/BlockEditable';
import { Draggable, Droppable } from "@hello-pangea/dnd";
import { BlockType } from '../../pages/SideBar';
import moveCursorToStartEnd from '../../utils/MoveCursorToStartEnd';

interface BlockWrapProps {
    id: string | undefined;
    blocks: BlockType[];
    handleTagChange: (index: number, newType: string) => void;
    handleContentChange: (index: number, newContent: string) => void;
    handleKeyDown: (e: React.KeyboardEvent<HTMLDivElement>, index: number) => void;
    currentBlockIdx: number | null;
    setCurrentBlockIdx: React.Dispatch<React.SetStateAction<number | null>>;
    prevBlock: BlockType[];
}

const BlockWrap = ({
    id,
    blocks,
    handleTagChange,
    handleContentChange,
    handleKeyDown,
    currentBlockIdx,
    setCurrentBlockIdx,
    prevBlock
}: BlockWrapProps) => {
    const focusChange = (currentBlockIdx: number, isNext: boolean) => {
        const nextBlockPosition = currentBlockIdx;
        setTimeout(() => {
            const block = document.querySelector<HTMLDivElement>(
                `[data-position="${nextBlockPosition}"]`
            );
            if (block) {
                if (!isNext) {
                    moveCursorToStartEnd(block, false);
                }
                block.focus();
            }
        }, 0);
    };

    useEffect(() => {
        if (
            currentBlockIdx !== null &&
            prevBlock.length + 1 === blocks.length
        ) {
            focusChange(currentBlockIdx, true);
        } else if (
            currentBlockIdx !== null &&
            prevBlock.length - 1 === blocks.length
        ) {
            focusChange(currentBlockIdx, false);
        } else if (currentBlockIdx !== null) {
            focusChange(currentBlockIdx, true);
        }
        setCurrentBlockIdx(null);
    }, [currentBlockIdx]);

    return (
        <Droppable droppableId="droppable">
            {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                    {blocks &&
                        blocks.length > 0 &&
                        blocks.map((currentBlock, idx) => (
                            <Draggable
                                key={idx}
                                draggableId={String(idx)}
                                index={idx}
                            >
                                {(provided) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        style={{
                                            userSelect: "none",
                                            ...provided.draggableProps.style,
                                        }}
                                    >
                                        <BlockEditable
                                            key={idx}
                                            index={idx}
                                            id={id}
                                            type={currentBlock.type}
                                            content={currentBlock.content}
                                            handleContentChange={
                                                handleContentChange
                                            }
                                            handleTagChange={handleTagChange}
                                            handleKeyDown={handleKeyDown}
                                            dragHandleProps={
                                                provided.dragHandleProps
                                            }
                                        />
                                    </div>
                                )}
                            </Draggable>
                        ))}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    );
};

export default BlockWrap