import styled from "styled-components";
import { useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { HolderOutlined } from "@ant-design/icons";
import { Element as ElementType } from "../model/types";
import BlockTypePopup from "./BlockTypePopup";
import { updateElementType } from "../services/api";

interface ElementBoxProps {
  element: ElementType;
  columnIndex: number;
  elementIndex: number;
  blockId: string;
  handleContentChange: (
    elementId: string
  ) => (e: React.FormEvent<HTMLDivElement>) => void;
  handleKeyDown: (
    elementId: string,
    columnIndex: number,
    elementIndex: number
  ) => (e: React.KeyboardEvent<HTMLDivElement>) => void;
  showPopup: boolean;
  setPopupElementId: (id: string | null) => void;
  setFocusedElementId: (id: string) => void;
}

function ElementBox({
  element,
  columnIndex,
  elementIndex,
  blockId,
  handleContentChange,
  handleKeyDown,
  showPopup,
  setPopupElementId,
  setFocusedElementId,
}: ElementBoxProps) {
  const { id: articleId } = useParams<{ id: string }>();
  const queryClient = useQueryClient();
  const { _id: elementId, content, type } = element;

  const handleTypeChange = async (newType: string) => {
    try {
      await updateElementType(articleId, blockId, elementId, newType);
      queryClient.invalidateQueries(["article", articleId]);
      setPopupElementId(null);
      setFocusedElementId(elementId);
    } catch (error) {
      console.error("Error updating element type:", error);
    }
  };

  const getElementContentTag = () => {
    if (type === "bigTitle") return "h2";
    if (type === "middleTitle") return "h3";
    if (type === "smallTitle") return "h4";
    return "div";
  };

  const ElementContentTag = getElementContentTag();

  return (
    <Element>
      <IconWrapper>
        <HolderOutlined />
      </IconWrapper>
      <ElementContent
        as={ElementContentTag}
        contentEditable
        onInput={handleContentChange(elementId)}
        onKeyDown={handleKeyDown(elementId, columnIndex, elementIndex)}
        suppressContentEditableWarning
        id={elementId}
      >
        {content}
      </ElementContent>
      {showPopup && <BlockTypePopup onTypeChange={handleTypeChange} />}
    </Element>
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

const ElementContent = styled.div`
  width: 100%;
  padding: 3px 2px;
  height: fit-content;
`;

export default ElementBox;
