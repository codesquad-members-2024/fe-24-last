import styled from "styled-components";
import { Block } from "../model/types";
import debounce from "../utils/debounce";
import { updateBlockContent } from "../services/api";
import { useParams } from "react-router-dom";

interface BlockBoxProps {
  blockData: Block;
}

export default function BlockBox({ blockData }: BlockBoxProps) {
  const { content, _id: blockId } = blockData;
  const { id: pageId } = useParams<{ id: string }>();

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

  return (
    <Wrapper>
      <BlockArea
        contentEditable
        onInput={handleContentChange}
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
`;
