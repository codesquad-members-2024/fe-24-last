import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import { BlockType, PageType } from "./SideBar";
import BlockEditor from "../components/BlockEditor/BlockEditor";
import TitleEditor from "../components/TitleEditor/TitleEditor";
import { useCallback, useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { patchBlock } from "../services/pageService";
import debounce from "../utils/debounce";

const Page = () => {
    const { id } = useParams();
    const location = useLocation();
    const queryClient = useQueryClient();
    const state: PageType = location.state;
    const [blocks, setBlocks] = useState<BlockType[]>([]);

    const { mutate } = useMutation({
        mutationFn: async ({ id, blocks }: { id: string | undefined; blocks: BlockType[] }) => {
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debouncedMutation = useCallback(
        debounce(async ({ id, blocks }: { id: string; blocks: BlockType[] }) => {
            mutate({ id, blocks });
        }),
        [mutate]
    );

    useEffect(() => {
        setBlocks([...state.blocklist]);
    }, [id, state]);

    useEffect(() => {
        if (id) {
            debouncedMutation({ id, blocks });
        }
    }, [blocks, debouncedMutation, id, mutate])


    return (
        <PageContainer>
            <TitleEditor id={id} title={state.title} />
            {blocks && blocks.length > 0 &&
                blocks.map((currentBlock, idx) => (
                    <BlockEditor
                        key={idx}
                        index={idx}
                        id={id}
                        type={currentBlock.type}
                        content={currentBlock.content}
                        handleContentChange={handleContentChange}
                        
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