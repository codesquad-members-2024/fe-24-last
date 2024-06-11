import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import { BlockType, PageType } from "./SideBar";
import BlockEditable from "../components/BlockEditable/BlockEditable";
import TitleEditable from "../components/TitleEditable/TitleEditable";
import { useCallback, useEffect, useRef, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { patchBlock } from "../services/pageService";
import debounce from "../utils/debounce";
import moveCursorToStartEnd from "../utils/MoveCursorToStartEnd";
import { keyEvent } from "../utils/keyEventUtil";
import {
    DragDropContext,
    Draggable,
    Droppable,
    DropResult,
} from "@hello-pangea/dnd";

const Page = () => {
    const { id } = useParams();
    const location = useLocation();
    const queryClient = useQueryClient();
    const state: PageType = location.state;
    const prevBlock = useRef<BlockType[]>([]);
    const currentBlockIdx = useRef<number | null>(null);
    const [blocks, setBlocks] = useState<BlockType[]>([]);

    const { mutate } = useMutation({
        mutationFn: async ({id, blocks}: {id: string | undefined, blocks: BlockType[]}) => {
            await patchBlock(`page/block/${id}`, { block: blocks });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["pageList"] });
        },
    });

    const handleContentChange = (index: number, newContent: string) => {
        const updatedBlocks = blocks.map((block, i) =>
            i === index ? { ...block, content: newContent || "" } : block
        );
        setBlocks(updatedBlocks);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>, index: number) => {
        if (e.nativeEvent.isComposing) return;

        const updateBlock = [...blocks];
        const selection = window.getSelection();
        const range = selection?.rangeCount ? selection.getRangeAt(0) : null;
        const curBlock = document.querySelector<HTMLDivElement>(`[data-position="${index}"]`);

        switch (e.key) {
            case "Enter":
                keyEvent.enterEvent({e, setBlocks, updateBlock, currentBlockIdx, index})
                break;
            case "Backspace":
                if (index > 0 && !blocks[index].content) keyEvent.backspaceEvent({e, index, updateBlock, setBlocks, currentBlockIdx})
                break;
            case "ArrowUp":
                if (index > 0) keyEvent.arrowUpEvent({e, index})
                break;
            case "ArrowDown":
                if (index < blocks.length - 1) keyEvent.arrowDownEvent({e, index})
                break;
            case "ArrowRight":
                if (range?.endOffset === curBlock?.textContent?.length && index < blocks.length - 1) keyEvent.arrowRightEvent({e, index})
                break;
            case "ArrowLeft":
                if (range?.startOffset === 0 && index > 0) keyEvent.arrowLeftEvent({e, index})
                break;
        }
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debouncedMutation = useCallback(
        debounce(
            async ({ id, blocks }: { id: string; blocks: BlockType[] }) => {
                mutate({ id, blocks });
            }
        ),
        [mutate]
    );

    const handleOnDragEnd = (result: DropResult) => {
        if (!result.destination) return;

        const items = blocks;
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setBlocks(items);
        if (id) {
            debouncedMutation({ id, blocks });
            prevBlock.current = [...blocks];
        }
    };

    useEffect(() => {
        if (
            currentBlockIdx.current !== null &&
            prevBlock.current.length + 1 === blocks.length
        ) {
            const nextBlockPosition = currentBlockIdx.current;
            setTimeout(() => {
                const nextBlock = document.querySelector<HTMLDivElement>(
                    `[data-position="${nextBlockPosition}"]`
                );
                if (nextBlock) {
                    nextBlock.focus();
                }
            }, 0);
        }
        if (
            currentBlockIdx.current !== null &&
            prevBlock.current.length - 1 === blocks.length
        ) {
            const nextBlockPosition = currentBlockIdx.current;
            setTimeout(() => {
                const prevBlock = document.querySelector<HTMLDivElement>(
                    `[data-position="${nextBlockPosition}"]`
                );
                if (prevBlock) {
                    moveCursorToStartEnd(prevBlock, false);
                    prevBlock.focus();
                }
            }, 0);
        }
        currentBlockIdx.current = null;
    }, [blocks]);

    useEffect(() => {
        setBlocks([...state.blocklist]);
    }, [id, state]);

    useEffect(() => {
        if (id) {
            debouncedMutation({ id, blocks });
            prevBlock.current = [...blocks];
        }
    }, [blocks, debouncedMutation, id, mutate]);

    return (
        <PageContainer>
            <TitleEditable id={id} title={state.title} />
            <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="droppable">
                    {(provided) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
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
                                                    userSelect: 'none',
                                                    backgroundColor: '#fff',
                                                    color: '#333',
                                                    ...provided.draggableProps.style,
                                                }}
                                            >
                                                <BlockEditable
                                                    key={idx}
                                                    index={idx}
                                                    id={id}
                                                    type={currentBlock.type}
                                                    content={currentBlock.content}
                                                    handleContentChange={handleContentChange}
                                                    handleKeyDown={handleKeyDown}
                                                    dragHandleProps={provided.dragHandleProps}
                                                />
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </PageContainer>
    );
};

export default Page;

const PageContainer = styled.div`
    max-width: 100%;
    height: 100%;
`;