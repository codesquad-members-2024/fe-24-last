import { useRef } from "react";
import styled from "styled-components";
import { Block } from "../model/types";
import debounce from "../utils/debounce";
import {
  updateBlockContent,
  createNewBlock,
  deleteBlock,
} from "../services/api";
import { useParams } from "react-router-dom";

interface BlockBoxProps {
  blockData: Block;
  refetchCurrentArticle: () => void;
  blockIndex: number;
  setFocusOnNewBlock: (
    index: number,
    ref: React.RefObject<HTMLDivElement>
  ) => void;
}

export default function BlockBox({
  blockData,
  refetchCurrentArticle,
  blockIndex,
  setFocusOnNewBlock,
}: BlockBoxProps) {
  const { id: pageId } = useParams<{ id: string }>();
  const { content, _id: blockId } = blockData;
  const blockRef = useRef<HTMLDivElement>(null);

  const [debouncedSaveContent, clearDebouncedSaveContent] = debounce(
    async (newContent: string) => {
      try {
        await updateBlockContent(pageId, blockId, newContent);
      } catch (error) {
        console.error("Error:", error);
      }
    },
    1000
  );

  const handleContentChange = (e: React.FormEvent<HTMLDivElement>) => {
    const newContent = e.currentTarget.innerText;
    debouncedSaveContent(newContent);
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      try {
        await createNewBlock(pageId, blockIndex);
        refetchCurrentArticle();
        setFocusOnNewBlock(blockIndex + 1, blockRef);
      } catch (error) {
        console.error(error);
      }
    } else if (e.key === "Backspace") {
      if (blockRef.current && blockRef.current.innerText === "") {
        e.preventDefault();
        try {
          clearDebouncedSaveContent();
          await deleteBlock(pageId, blockId);
          refetchCurrentArticle();
        } catch (error) {
          console.error("Error deleting block:", error);
        }
      }
    }
  };

  return (
    <Wrapper>
      <BlockArea
        ref={blockRef}
        contentEditable
        onInput={handleContentChange}
        onKeyDown={handleKeyDown}
        suppressContentEditableWarning
        id={blockId}
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
