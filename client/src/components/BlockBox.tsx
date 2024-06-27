import { useState } from "react";
import { useQueryClient } from "react-query";
import styled from "styled-components";
import { Block } from "../model/types";
import debounce from "../utils/debounce";
import { useParams } from "react-router-dom";
import { Article } from "../model/types";
import ElementBox from "./ElementBox";

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
  const { id: articleId } = useParams<{ id: string }>();
  const queryClient = useQueryClient();
  const { columnList, _id: blockId } = blockData;

  return (
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
