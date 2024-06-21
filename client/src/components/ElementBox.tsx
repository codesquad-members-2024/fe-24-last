import styled from "styled-components";
import { HolderOutlined } from "@ant-design/icons";

interface BlockElementProps {
  element: {
    _id: string;
    content: string;
  };
  columnIndex: number;
  elementIndex: number;
  handleContentChange: (
    elementId: string
  ) => (e: React.FormEvent<HTMLDivElement>) => void;
  handleKeyDown: (
    elementId: string,
    columnIndex: number,
    elementIndex: number
  ) => (e: React.KeyboardEvent<HTMLDivElement>) => void;
}

function BlockElement({
  element,
  columnIndex,
  elementIndex,
  handleContentChange,
  handleKeyDown,
}: BlockElementProps) {
  const { _id: elementId, content } = element;

  return (
    <Element>
      <IconWrapper>
        <HolderOutlined />
      </IconWrapper>
      <ElementContent
        contentEditable
        onInput={handleContentChange(elementId)}
        onKeyDown={handleKeyDown(elementId, columnIndex, elementIndex)}
        suppressContentEditableWarning
        id={elementId}
      >
        {content}
      </ElementContent>
    </Element>
  );
}

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

export default BlockElement;
