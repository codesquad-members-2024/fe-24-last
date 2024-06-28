import styled from "styled-components";
import { useState } from "react";
import { useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { HolderOutlined } from "@ant-design/icons";
import { Block, Element as ElementType } from "../model/types";
import BlockTypePopup from "./ElementTypePopup";
import {
  useCreateNewBlockOrElement,
  useDeleteElement,
  useMoveElement,
  useUpdateElementContent,
  useUpdateElementType,
} from "../hooks/api";
import debounce from "../utils/debounce";
import Draggable from "./Dnd/Draggable";
import Droppable, { OnDrop } from "./Dnd/Droppable";

interface ElementBoxProps {
  element: ElementType;
  blockIndex: number;
  columnIndex: number;
  elementIndex: number;
  localBlockList: Block[];
  setFocusedElementId: (id: string | null) => void;
}

function ElementBox({
  element,
  blockIndex,
  columnIndex,
  elementIndex,
  localBlockList,
  setFocusedElementId,
}: ElementBoxProps) {
  const { id: articleId = "" } = useParams<{ id: string }>();
  const queryClient = useQueryClient();
  const { _id: elementId, content, type } = element;
  const { mutate: updateElementContent } = useUpdateElementContent(articleId);
  const { mutate: updateElementType } = useUpdateElementType(
    articleId,
    queryClient
  );
  const { mutate: createNewBlockOrElement } = useCreateNewBlockOrElement(
    articleId,
    queryClient
  );
  const { mutate: deleteElement } = useDeleteElement(articleId, queryClient);
  const { mutate: moveElement } = useMoveElement(articleId, queryClient);
  const [popupElementId, setPopupElementId] = useState<string | null>(null);

  const isSolo =
    localBlockList[blockIndex]?.columnList?.length === 1 &&
    localBlockList[blockIndex]?.columnList[columnIndex]?.length === 1;

  const [debouncedUpdateElement, clearDebouncedUpdateElement] = debounce(
    updateElementContent,
    500
  );

  const handleContentChange = (e: React.FormEvent<HTMLDivElement>) => {
    const newContent = e.currentTarget.innerText;
    debouncedUpdateElement({
      newContent,
      elementIndexInfo: { blockIndex, columnIndex, elementIndex },
    });
  };

  const handleTypeChange = async (newType: string) => {
    updateElementType({
      type: newType,
      elementIndexInfo: { blockIndex, columnIndex, elementIndex },
    });
    setPopupElementId(null);
    setFocusedElementId(elementId);
  };

  const handleKeyDown =
    (elementId: string, columnIndex: number, elementIndex: number) =>
    async (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.nativeEvent.isComposing) return;
      if (e.key === "Enter") {
        e.preventDefault();
        if (isSolo) {
          createNewBlockOrElement(
            { blockIndex: blockIndex + 1 },
            {
              onSuccess: (data) => {
                setFocusedElementId(data.newElementId);
              },
            }
          );
        } else {
          createNewBlockOrElement(
            {
              blockIndex,
              columnIndex,
              elementIndex: elementIndex + 1,
            },
            {
              onSuccess: (data) => {
                setFocusedElementId(data.newElementId);
              },
            }
          );
        }
      } else if (e.key === "Backspace") {
        if (e.currentTarget.innerText === "") {
          e.preventDefault();
          clearDebouncedUpdateElement();
          let previousElementId = null;
          if (isSolo) {
            //이전 블록의 가장 마지막 컬럼의 마지막 요소의 id가 previousElementId가 되어야 함
            const prevBlock = localBlockList[blockIndex - 1];
            const lastColumnIndex = prevBlock.columnList.length - 1;
            const lastColumn = prevBlock.columnList[lastColumnIndex];
            const lastElementIndex = lastColumn.length - 1;
            previousElementId = lastColumn[lastElementIndex]._id;
          } else if (
            localBlockList[blockIndex].columnList[columnIndex].length === 1
          ) {
            // 현재 요소가 블록의 마지막 요소인 경우
            const prevColumn =
              localBlockList[blockIndex].columnList[columnIndex - 1];
            const lastElementIndex = prevColumn.length - 1;
            previousElementId = prevColumn[lastElementIndex]._id;
          } else {
            // 바로 이전 요소의 id가 previousElementId가 되어야 함
            previousElementId =
              localBlockList[blockIndex].columnList[columnIndex][
                elementIndex - 1
              ]._id;
          }
          deleteElement({ blockIndex, columnIndex, elementIndex });
          setFocusedElementId(previousElementId);
        }
      } else if (e.key === "/") {
        e.preventDefault();
        setPopupElementId(elementId);
      }
    };

  const getElementContentTag = () => {
    if (type === "bigTitle") return "h2";
    if (type === "middleTitle") return "h3";
    if (type === "smallTitle") return "h4";
    return "div";
  };

  const ElementContentTag = getElementContentTag();

  const handleElementDrop: OnDrop = ({
    dropDirection,
    draggingItemId,
    dropTargetId,
  }) => {
    const [
      draggedElementBlockIndex,
      draggedElementColumnIndex,
      draggedElementIndex,
    ] = draggingItemId.split("-").map(Number);
    const [dropBlockIndex, dropColumnIndex, dropElementIndex] = dropTargetId
      .split("-")
      .map(Number);
    const targetElementIndex =
      dropDirection === "TOP" ? dropElementIndex : dropElementIndex + 1;
    moveElement({
      elementIndexInfo: {
        blockIndex: draggedElementBlockIndex,
        columnIndex: draggedElementColumnIndex,
        elementIndex: draggedElementIndex,
      },
      targetIndexInfo: {
        blockIndex: dropBlockIndex,
        columnIndex: dropColumnIndex,
        elementIndex: targetElementIndex,
      },
    });
  };

  return (
    <Droppable
      id={`${blockIndex}-${columnIndex}-${elementIndex}`}
      onDrop={handleElementDrop}
      isDisabled={isSolo}
      allowedDirections={elementIndex === 0 ? ["TOP", "BOTTOM"] : ["BOTTOM"]}
    >
      <Draggable id={`${blockIndex}-${columnIndex}-${elementIndex}`}>
        {(provided) => (
          <Element>
            <IconWrapper {...provided.dragHandlerProps}>
              <HolderOutlined />
            </IconWrapper>
            <ElementContent
              as={ElementContentTag}
              contentEditable
              type={type}
              onInput={handleContentChange}
              onKeyDown={handleKeyDown(elementId, columnIndex, elementIndex)}
              suppressContentEditableWarning
              id={elementId}
            >
              {content}
            </ElementContent>
            {elementId === popupElementId && (
              <BlockTypePopup onTypeChange={handleTypeChange} />
            )}
          </Element>
        )}
      </Draggable>
    </Droppable>
  );
}

const Element = styled.div`
  display: flex;
  flex-direction: row;
  padding: 8px;
  flex-basis: 0;
  position: relative;
  align-items: center;
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

const ElementContent = styled.div<{ type: string }>`
  width: 100%;
  padding: 3px 2px;
  height: fit-content;

  ${({ type }) =>
    type === "bulletPoint" &&
    `
    &::before {
      content: '• ';
      font-weight: bold;
    }
  `}
`;

export default ElementBox;
