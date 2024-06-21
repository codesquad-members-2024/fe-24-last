import styled from "styled-components";
import { Block } from "../model/types";
import debounce from "../utils/debounce";
import {
  updateBlockContent,
  createNewBlockOrElement,
  deleteBlock,
} from "../services/api";
import { useParams } from "react-router-dom";
import { Article } from "../model/types";
import ElementBox from "./ElementBox";

interface BlockBoxProps {
  blockData: Block;
  refetchCurrentArticle: () => void;
  blockIndex: number;
  setFocusedElementId: (id: string) => void;
  currentArticle: Article;
}

export default function BlockBox({
  blockData,
  refetchCurrentArticle,
  blockIndex,
  setFocusedElementId,
  currentArticle,
}: BlockBoxProps) {
  const { id: pageId } = useParams<{ id: string }>();
  const { columnList, _id: blockId } = blockData;

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
          const response = await createNewBlockOrElement(
            pageId,
            blockId,
            columnIndex,
            elementIndex
          );
          setFocusedElementId(response.newElementId);
          refetchCurrentArticle();
        } catch (error) {
          console.error(error);
        }
      } else if (e.key === "Backspace") {
        if (e.currentTarget.innerText === "") {
          e.preventDefault();
          try {
            clearDebouncedSaveContent();

            let previousElementId = null;

            if (columnList[columnIndex].length > 1) {
              previousElementId =
                columnList[columnIndex][elementIndex - 1]?._id || null;
            } else if (columnList.length > 1) {
              previousElementId =
                columnList[columnIndex - 1][
                  columnList[columnIndex - 1].length - 1
                ]?._id || null;
            } else if (blockIndex > 0) {
              const previousBlock = currentArticle.blockList[blockIndex - 1];
              previousElementId =
                previousBlock.columnList[previousBlock.columnList.length - 1][
                  previousBlock.columnList[previousBlock.columnList.length - 1]
                    .length - 1
                ]._id;
            }

            if (previousElementId) {
              setFocusedElementId(previousElementId);
            }

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
      {columnList.map((column, columnIndex) => (
        <Column key={`${blockId}-${columnIndex}`}>
          {column.map((element, elementIndex) => (
            <ElementBox
              key={element._id}
              element={element}
              columnIndex={columnIndex}
              elementIndex={elementIndex}
              handleContentChange={handleContentChange}
              handleKeyDown={handleKeyDown}
            />
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

const Element = styled.div`
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

  ${Element}:hover & {
    visibility: visible;
  }
`;

const ElementContent = styled.div`
  width: 100%;
  padding: 3px 2px;
  height: fit-content;
`;
