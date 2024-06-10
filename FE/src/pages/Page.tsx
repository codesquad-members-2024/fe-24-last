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

const newBlock: BlockType = {
    type: "text",
    content: "",
    children: [],
};
const Page = () => {
    const { id } = useParams();
    const location = useLocation();
    const queryClient = useQueryClient();
    const state: PageType = location.state;
    const [blocks, setBlocks] = useState<BlockType[]>([]);
    const prevBlock = useRef<BlockType[]>([]);
    const currentBlockIdx = useRef<number | null>(null);

    const { mutate } = useMutation({
        mutationFn: async ({
            id,
            blocks,
        }: {
            id: string | undefined;
            blocks: BlockType[];
        }) => {
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

    const handleKeyDown = (
        e: React.KeyboardEvent<HTMLDivElement>,
        index: number
    ) => {
        if (e.nativeEvent.isComposing) {
            return;
        }

        const upDateBlock = [...blocks];
        const selection = window.getSelection();
        const range = selection?.rangeCount ? selection.getRangeAt(0) : null;
        const curBlock = document.querySelector<HTMLDivElement>(
            `[data-position="${index}"]`
        );

        switch (e.key) {
            case "Enter":
                e.preventDefault();
                upDateBlock.splice(index + 1, 0, newBlock);
                setBlocks(upDateBlock);
                currentBlockIdx.current = index + 1;
                break;
            case "Backspace":
                if (index > 0 && !blocks[index].content) {
                    e.preventDefault();
                    upDateBlock.splice(index, 1);
                    setBlocks(upDateBlock);
                    currentBlockIdx.current = index - 1;
                }
                break;
            case "ArrowUp":
                if (index > 0) {
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
                break;
            case "ArrowDown":
                if (index < blocks.length - 1) {
                    e.preventDefault();
                    const nextBlock = document.querySelector<HTMLDivElement>(
                        `[data-position="${index + 1}"]`
                    );
                    if (nextBlock) {
                        moveCursorToStartEnd(nextBlock, false);
                        nextBlock.focus();
                    }
                }
                break;
            case "ArrowRight":
                if (
                    range?.endOffset === curBlock?.textContent?.length &&
                    index < blocks.length - 1
                ) {
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
                }
                break;
            case "ArrowLeft":
                if (
                    range?.startOffset === 0 &&
                    index > 0
                ) {
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
            {blocks &&
                blocks.length > 0 &&
                blocks.map((currentBlock, idx) => (
                    <BlockEditable
                        key={idx}
                        index={idx}
                        id={id}
                        type={currentBlock.type}
                        content={currentBlock.content}
                        handleContentChange={handleContentChange}
                        handleKeyDown={handleKeyDown}
                    />
                ))}
        </PageContainer>
    );
};

export default Page;

const PageContainer = styled.div`
    max-width: 100%;
    height: 100%;
`;


// 커서 처음으로 이동하는 문제
// 페이지 이동시 커서 위치 기억 문제
// 한글 조합 문제