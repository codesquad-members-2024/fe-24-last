import styled from "styled-components";
import { Block } from "../model/types";
import debounce from "../utils/debounce";
import { updateBlockContent, createNewBlock } from "../services/api";
import { useParams } from "react-router-dom";

interface BlockBoxProps {
  blockData: Block;
  refetchCurrentArticle: () => void;
}

export default function BlockBox({
  blockData,
  refetchCurrentArticle,
}: BlockBoxProps) {
  const { id: pageId } = useParams<{ id: string }>();
  const { content, _id: blockId } = blockData;

  const debouncedSaveContent = debounce(async (newContent: string) => {
    try {
      await updateBlockContent(pageId, blockId, newContent);
    } catch (error) {
      console.error("Error:", error);
    }
  }, 1000);

  const handleContentChange = (e: React.FormEvent<HTMLDivElement>) => {
    const newContent = e.currentTarget.innerText;
    debouncedSaveContent(newContent);
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      try {
        await createNewBlock(pageId);
        refetchCurrentArticle();
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <Wrapper>
      <BlockArea
        contentEditable
        onInput={handleContentChange}
        onKeyDown={handleKeyDown}
        suppressContentEditableWarning
      >
        {content}
      </BlockArea>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 20px;
`;

const BlockArea = styled.div`
  width: 100%;
  height: 100%;
  border: 1px solid black;
`;
