import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import { BlockType, PageType } from "./SideBar";
import { patchBlock } from "../services/pageService";
import { keyEvent } from "../utils/keyEventUtil";
import debounce from "../utils/debounce";
import moveCursorToStartEnd from "../utils/MoveCursorToStartEnd";
import BlockEditable from "../components/BlockEditable/BlockEditable";
import TitleEditable from "../components/TitleEditable/TitleEditable";
import styled from "styled-components";
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
    const [currentBlockIdx, setCurrentBlockIdx] = useState<number | null>(null);
    const [, setBlockState] = useState<BlockType[]>([]);
    const blocks = useRef<BlockType[]>([]);

    const { mutate } = useMutation({
        mutationFn: async ({id, blocks}: {id: string | undefined, blocks: BlockType[]}) => {
            await patchBlock(`page/block/${id}`, { block: blocks });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["pageList"] });
        },
    });

    const handleBlockChange = (index: number, key: keyof BlockType, value: string) => {
        const updatedBlocks = blocks.current.map((block, i) =>
            i === index ? { ...block, [key]: value || "" } : block
        );
        blocks.current = [...updatedBlocks];
        debouncedMutation({ id, blocks: updatedBlocks });
    };
    
    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>, index: number) => {
        if (e.nativeEvent.isComposing) return;
        const updateBlock = [...blocks.current];
        const selection = window.getSelection();
        const range = selection?.rangeCount ? selection.getRangeAt(0) : null;
        const curBlock = document.querySelector<HTMLDivElement>(`[data-position="${index}"]`);
        prevBlock.current = [...blocks.current];
        switch (e.key) {
            case "Enter":
                keyEvent.enterEvent({e, blocks, updateBlock, setCurrentBlockIdx, index})
                break;
            case "Backspace":
                if (index > 0 && !blocks.current[index].content) keyEvent.backspaceEvent({e, index, updateBlock, blocks, setCurrentBlockIdx})
                break;
            case "ArrowUp":
                if (index > 0) keyEvent.arrowUpEvent({e, index})
                break;
            case "ArrowDown":
                if (index < blocks.current.length - 1) keyEvent.arrowDownEvent({e, index})
                break;
            case "ArrowRight":
                if (range?.endOffset === curBlock?.textContent?.length && index < blocks.current.length - 1) keyEvent.arrowRightEvent({e, index})
                break;
            case "ArrowLeft":
                if (range?.startOffset === 0 && index > 0) keyEvent.arrowLeftEvent({e, index})
                break;
            default:
                break;
        }
        debouncedMutation({ id, blocks: blocks.current });
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debouncedMutation = useCallback(
        debounce(
            async ({ id, blocks }: { id: string | undefined; blocks: BlockType[] }) => {
                mutate({ id, blocks });
            }
        ),
        [mutate]
    );

    const handleOnDragEnd = (result: DropResult) => {
        if (!result.destination) return;

        const items = blocks.current;
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        blocks.current = [...items];
        debouncedMutation({ id, blocks: blocks.current });
    };

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
        if (currentBlockIdx !== null && prevBlock.current.length + 1 === blocks.current.length
        ) focusChange(currentBlockIdx, true);

        if (currentBlockIdx !== null && prevBlock.current.length - 1 === blocks.current.length
        ) focusChange(currentBlockIdx, false);

        setCurrentBlockIdx(null);
    }, [currentBlockIdx]);

    useEffect(() => {
        blocks.current = [...state.blocklist];
        setBlockState([...state.blocklist]);
        setCurrentBlockIdx(null)
    }, [id, state]);

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
                            {blocks.current &&
                                blocks.current.length > 0 &&
                                blocks.current.map((currentBlock, idx) => (
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
                                                    handleBlockChange={handleBlockChange}
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