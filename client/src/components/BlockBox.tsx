import styled from "styled-components";
import { Block } from "../model/types";

interface BlockBoxProps {
  blockData: Block;
}

export default function BlockBox({ blockData }: BlockBoxProps) {
  const { content } = blockData;
  return (
    <Wrapper>
      <BlockArea contentEditable suppressContentEditableWarning>
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
