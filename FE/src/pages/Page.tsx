import React, { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import { BlockType, PageType } from "./SideBar";
import { patchBlock } from "../services/pageService";
import { keyEvent } from "../utils/keyEventUtil";
import debounce from "../utils/debounce";
import TitleEditable from "../components/TitleEditable/TitleEditable";
import styled from "styled-components";
import { DragDropContext, DropResult} from "@hello-pangea/dnd";
import BlockWrap from "../components/BlockWrap/BlockWrap";

type KeyMap = "Enter" | "Backspace" | "ArrowUp" | "ArrowDown" | "ArrowRight" | "ArrowLeft";

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

    const debouncedMutation = useCallback(
        debounce(
            async ({ id, blocks }: { id: string | undefined; blocks: BlockType[] }) => {
                mutate({ id, blocks });
            }
        ),
        [mutate]
    );

    const handleTagChange = (index: number, newType: string) => {
        const updatedBlocks = blocks.current.map((block, i) =>
            i === index ? { ...block, type: newType || "", content: "" } : block
        );
        blocks.current = [...updatedBlocks];
        setCurrentBlockIdx(index)
        debouncedMutation({ id, blocks: updatedBlocks });
    };

    const handleContentChange = (index: number, newContent: string) => {
        const updatedBlocks = blocks.current.map((block, i) =>
            i === index ? { ...block, content: newContent } : block
        );
        blocks.current = [...updatedBlocks];
        debouncedMutation({ id, blocks: updatedBlocks });
    };
    
    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>, index: number) => {
        if (!["Enter", "Backspace", "ArrowUp",
            "ArrowDown", "ArrowRight", "ArrowLeft"].includes(e.key) ||
            e.nativeEvent.isComposing) return;
        const updateBlock = [...blocks.current];
        const selection = window.getSelection();
        const range = selection?.rangeCount ? selection.getRangeAt(0) : null;
        const curBlock = document.querySelector<HTMLDivElement>(
            `[data-position="${index}"]`);
        prevBlock.current = [...blocks.current];
        const parameter = (e.key === "Enter" || e.key === "Backspace") 
        ? { e, blocks, updateBlock, setCurrentBlockIdx, index } 
        : { e, index, blocks, range, curBlock };
        keyEvent[e.key as KeyMap](parameter as any);
        debouncedMutation({ id, blocks: blocks.current });
    };

    const handleOnDragEnd = (result: DropResult) => {
        if (!result.destination) return;

        const items = blocks.current;
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        blocks.current = [...items];
        debouncedMutation({ id, blocks: blocks.current });
    };

    useEffect(() => {
        blocks.current = [...state.blocklist];
        setBlockState([...state.blocklist]);
    }, [id, state]);

    return (
        <PageContainer>
            <TitleEditable id={id} title={state.title} />
            <DragDropContext onDragEnd={handleOnDragEnd}>
                <BlockWrap
                    id={id}
                    blocks={blocks.current}
                    handleTagChange={handleTagChange}
                    handleContentChange={handleContentChange}
                    handleKeyDown={handleKeyDown}
                    currentBlockIdx={currentBlockIdx}
                    setCurrentBlockIdx={setCurrentBlockIdx}
                    prevBlock={prevBlock.current}
                />
            </DragDropContext>
        </PageContainer>
    );
};

export default Page;

const PageContainer = styled.div`
    max-width: 100%;
    height: 100%;
`;