import styled from "styled-components";
import { useState } from "react";
import { Block } from "./ArticleLayout";
import Popup from "./Popup";
import { updateData } from "../services/api";
import { useParams } from "react-router-dom";

interface BlockProps {
  block: Block;
  index: number;
  handleKeyDown: ( e: React.KeyboardEvent<HTMLDivElement>, index: number ) => void;
  handleInput: ( e: React.FormEvent<HTMLDivElement>, index: number, newContent: string ) => void;
}

const BlockList: React.FC<BlockProps> = ({ block, index, handleKeyDown, handleInput }) => {
  const { id: pageId } = useParams<{ id: string }>();
  const { _id: blockId, type: blockType, content: blockContent } = block;
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupPosition, setPopupPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });

  const handleKeyDownWrapper = (e: React.KeyboardEvent<HTMLDivElement>, index: number) => {
    if (e.key === '/') {
      e.preventDefault();
      const rect = e.currentTarget.getBoundingClientRect();
      setPopupPosition({ top: rect.top, left: rect.left });
      setIsPopupOpen(true);
    } 
    else {
      handleKeyDown(e, index);
    }
  };
  
  const handleChangeBlockType = async (newType: string) => {
    await updateData(`pages/${pageId}/blocks/${blockId}`, { type: newType });
    block.type = newType;
    setIsPopupOpen(false);
  }

  return (
    <>
      <StyledContentBlock
        as={blockType}
        key={blockId}
        contentEditable
        aria-placeholder="글을 작성하려면 '스페이스' 키를, 명령어를 사용하려면 '/' 키를 누르세요."
        onKeyDown={(e) => handleKeyDownWrapper(e, index)}
        onInput={(e) => handleInput(e, index, e.currentTarget.innerText)}
        suppressContentEditableWarning
      >
        {blockContent}
      </StyledContentBlock>
      {isPopupOpen && <Popup position={popupPosition} onChangeBlockType={handleChangeBlockType}/>}
    </>
  );
};

const StyledContentBlock = styled.div`
  max-width: 100%;
  width: 100%;
  white-space: pre-wrap;
  word-break: break-word;
  caret-color: rgb(55, 53, 47);
  padding: 3px 2px;
  outline: transparent;
  &:empty:before {
    content: attr(aria-placeholder);
    color: gray;
  }
`;

export default BlockList;
