import { useRef } from "react";
import styled from "styled-components";
import { Block } from "../model/types";
import debounce from "../utils/debounce";
import {
  updateBlockContent,
  createNewBlockOrElement,
  deleteBlock,
} from "../services/api";
import { useParams } from "react-router-dom";
import { HolderOutlined } from "@ant-design/icons";

interface BlockBoxProps {
  blockData: Block;
  refetchCurrentArticle: () => void;
  blockIndex: number;
}

export default function BlockBox({
  blockData,
  refetchCurrentArticle,
  blockIndex,
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

  const handleKeyDown =
    (elementId: string, columnIndex: number, elementIndex: number) =>
    async (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.nativeEvent.isComposing) return;
      if (e.key === "Enter") {
        e.preventDefault();
        try {
          const newBlock = await createNewBlockOrElement(
            pageId,
            blockId,
            columnIndex,
            elementIndex
          );
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
            await deleteBlock(pageId, blockId, elementId);
            refetchCurrentArticle();
          } catch (error) {
            console.error("Error deleting block:", error);
          }
        }
      }
    };

  return (
    <Wrapper>
      {element.map((column, columnIndex) => (
        <Column key={`${blockId}-${columnIndex}`}>
          {column.map((element, elementIndex) => (
            <Cell key={element._id}>
              <IconWrapper>
                <HolderOutlined />
              </IconWrapper>
              <BlockArea
                ref={blockRef}
                contentEditable
                onInput={handleContentChange(element._id)}
                onKeyDown={handleKeyDown(
                  element._id,
                  columnIndex,
                  elementIndex
                )}
                suppressContentEditableWarning
                id={element._id}
              >
                {element.content}
              </BlockArea>
            </Cell>
          ))}
        </Column>
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-bottom: 8px;
  border: 1px solid red;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Cell = styled.div`
  display: flex;
  flex-direction: row;
  padding: 8px;
  flex-basis: 0;
  position: relative;
`;

const IconWrapper = styled.div`
  visibility: hidden;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
  height: fit-content;

  ${Cell}:hover & {
    visibility: visible;
  }
`;

const BlockArea = styled.div`
  width: 100%;
  padding: 3px 2px;
  height: fit-content;
`;
