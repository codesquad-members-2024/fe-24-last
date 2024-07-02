import { useState } from "react";
import { useQueryClient } from "react-query";
import styled from "styled-components";
import { Block } from "../model/types";
import debounce from "../utils/debounce";
import { useParams } from "react-router-dom";
import { Article } from "../model/types";
import ElementBox from "./ElementBox";
import Droppable, { OnDrop } from "./Dnd/Droppable";
import { useMoveElement } from "../hooks/api";

interface BlockBoxProps {
  blockData: Block;
  blockIndex: number;
  setFocusedElementId: (id: string | null) => void;
  localBlockList: Block[];
}

export default function BlockBox({
  blockData,
  blockIndex,
  setFocusedElementId,
  localBlockList,
}: BlockBoxProps) {
  const { id: articleId = "" } = useParams<{ id: string }>();
  const queryClient = useQueryClient();
  const { mutate: moveElement } = useMoveElement(articleId, queryClient);
  const { columnList, _id: blockId } = blockData;

  const handleBlockDrop: OnDrop = ({
    dropDirection,
    draggingItemId,
    dropTargetId,
  }) => {
    const [
      draggedElementBlockIndex,
      draggedElementColumnIndex,
      draggedElementIndex,
    ] = draggingItemId.split("-").map(Number);
    const dropBlockIndex = +dropTargetId;

    const targetBlockIndex =
      dropDirection === "TOP" ? dropBlockIndex : dropBlockIndex + 1;

    moveElement({
      elementIndexInfo: {
        blockIndex: draggedElementBlockIndex,
        columnIndex: draggedElementColumnIndex,
        elementIndex: draggedElementIndex,
      },
      targetIndexInfo: {
        blockIndex: targetBlockIndex,
      },
    });
  };

  const handleColumnDrop: OnDrop = ({
    dropDirection,
    draggingItemId,
    dropTargetId,
  }) => {
    const [
      draggedElementBlockIndex,
      draggedElementColumnIndex,
      draggedElementIndex,
    ] = draggingItemId.split("-").map(Number);
    const [dropBlockIndex, dropColumnIndex] = dropTargetId
      .split("-")
      .map(Number);
    const targetColumnIndex =
      dropDirection === "LEFT" ? dropColumnIndex : dropColumnIndex + 1;
    moveElement({
      elementIndexInfo: {
        blockIndex: draggedElementBlockIndex,
        columnIndex: draggedElementColumnIndex,
        elementIndex: draggedElementIndex,
      },
      targetIndexInfo: {
        blockIndex: dropBlockIndex,
        columnIndex: targetColumnIndex,
      },
    });
  };

  return (
    <Droppable
      id={`${blockIndex}`}
      onDrop={handleBlockDrop}
      allowedDirections={blockIndex === 0 ? ["TOP", "BOTTOM"] : ["BOTTOM"]}
    >
      <Wrapper>
        {columnList.map((column, columnIndex) => (
          <Droppable
            key={`${blockId}-${columnIndex}`}
            id={`${blockIndex}-${columnIndex}`}
            onDrop={handleColumnDrop}
            allowedDirections={
              columnIndex === 0 ? ["LEFT", "RIGHT"] : ["RIGHT"]
            }
          >
            <Column>
              {column.map((element, elementIndex) => (
                <ElementBox
                  key={element._id}
                  element={element}
                  blockIndex={blockIndex}
                  columnIndex={columnIndex}
                  elementIndex={elementIndex}
                  localBlockList={localBlockList}
                  setFocusedElementId={setFocusedElementId}
                />
              ))}
            </Column>
          </Droppable>
        ))}
      </Wrapper>
    </Droppable>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  border: 1px solid red;

  > * {
    flex: 1;
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
