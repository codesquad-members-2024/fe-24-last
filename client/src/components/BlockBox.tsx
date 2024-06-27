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
    console.log(targetBlockIndex);

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

  return (
    <Droppable
      id={`${blockIndex}`}
      onDrop={handleBlockDrop}
      allowedDirections={blockIndex === 0 ? ["TOP", "BOTTOM"] : ["BOTTOM"]}
    >
      <Wrapper>
        {columnList.map((column, columnIndex) => (
          <Column key={`${blockId}-${columnIndex}`}>
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
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
