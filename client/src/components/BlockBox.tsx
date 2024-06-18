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
import { HolderOutlined } from "@ant-design/icons";

interface BlockBoxProps {
  blockData: Block;
  refetchCurrentArticle: () => void;
  blockIndex: number;
  setNewBlockIndex: (id: string) => void;
}

export default function BlockBox({
  blockData,
  refetchCurrentArticle,
  blockIndex,
  setNewBlockIndex,
}: BlockBoxProps) {
  const { id: pageId } = useParams<{ id: string }>();
  const { element, _id: blockId } = blockData;
  const blockRef = useRef<HTMLDivElement>(null);

  const [debouncedSaveContent, clearDebouncedSaveContent] = debounce(
    async (blockId, elementId, newContent) => {
      try {
        await updateBlockContent(pageId, blockId, elementId, newContent);
      } catch (error) {
        console.error("Error:", error);
      }
    },
    1000
  );

  const handleContentChange =
    (elementId: string) => (e: React.FormEvent<HTMLDivElement>) => {
      const newContent = e.currentTarget.innerText;
      debouncedSaveContent(blockId, elementId, newContent);
    };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.nativeEvent.isComposing) return;
    if (e.key === "Enter") {
      e.preventDefault();
      try {
        const newBlock = await createNewBlock(pageId, blockIndex);
        setNewBlockIndex(newBlock.nextIdx);
        refetchCurrentArticle();
      } catch (error) {
        console.error(error);
      }
    } else if (e.key === "Backspace") {
      if (blockRef.current && blockRef.current.innerText === "") {
        e.preventDefault();
        try {
          clearDebouncedSaveContent();
          const previousBlockIndex = blockIndex > 0 ? blockIndex - 1 : 0;
          setNewBlockIndex(previousBlockIndex.toString());
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
      {element.map((row, rowIndex) => (
        <Row key={`${blockId}-${rowIndex}`}>
          {row.map((child) => (
            <Cell key={child._id}>
              <IconWrapper>
                <HolderOutlined />
              </IconWrapper>
              <BlockArea
                ref={blockRef}
                contentEditable
                onInput={handleContentChange(child._id)}
                onKeyDown={handleKeyDown}
                suppressContentEditableWarning
                id={child._id}
              >
                {child.content}
              </BlockArea>
            </Cell>
          ))}
        </Row>
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 8px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const Cell = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px;
  flex-grow: 1;
  flex-basis: 0;
  position: relative;
`;

const IconWrapper = styled.div`
  visibility: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  ${Cell}:hover & {
    visibility: visible;
  }
`;

const BlockArea = styled.div`
  width: 100%;
  padding: 3px 2px;
`;
