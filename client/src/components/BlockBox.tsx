import { useState } from "react";
import { useQueryClient } from "react-query";
import styled from "styled-components";
import { Block } from "../model/types";
import debounce from "../utils/debounce";
import {
  updateElementContent,
  createNewBlockOrElement,
  deleteBlock,
} from "../services/api";
import { useParams } from "react-router-dom";
import { Article } from "../model/types";
import ElementBox from "./ElementBox";

interface BlockBoxProps {
  blockData: Block;
  blockIndex: number;
  setFocusedElementId: (id: string) => void;
  currentArticle: Article;
}

export default function BlockBox({
  blockData,
  blockIndex,
  setFocusedElementId,
  currentArticle,
}: BlockBoxProps) {
  const { id: articleId } = useParams<{ id: string }>();
  const queryClient = useQueryClient();
  const { columnList, _id: blockId } = blockData;
  const [popupElementId, setPopupElementId] = useState<string | null>(null);

  const [debouncedSaveContent, clearDebouncedSaveContent] = debounce(
    async (blockId, elementId, newContent) => {
      try {
        await updateElementContent(articleId, blockId, elementId, newContent);
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
            articleId,
            blockId,
            columnIndex,
            elementIndex
          );
          setFocusedElementId(response.newElementId);
          queryClient.invalidateQueries(["article", articleId]);
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

            await deleteBlock(articleId, blockId, elementId);
            queryClient.invalidateQueries(["article", articleId]);
          } catch (error) {
            console.error("Error deleting block:", error);
          }
        }
      } else if (e.key === "/") {
        e.preventDefault();
        setPopupElementId(elementId);
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
              blockId={blockId}
              handleContentChange={handleContentChange}
              handleKeyDown={handleKeyDown}
              showPopup={popupElementId === element._id}
              setPopupElementId={setPopupElementId}
              setFocusedElementId={setFocusedElementId}
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
