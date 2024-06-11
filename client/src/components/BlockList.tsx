import styled from "styled-components";
import { Block } from "./ArticleLayout";

interface BlockProps {
  block: Block;
  index: number;
  handleKeyDown: ( e: React.KeyboardEvent<HTMLDivElement>, index: number ) => void;
  handleInput: ( e: React.FormEvent<HTMLDivElement>, index: number, newContent: string ) => void;
}

const BlockList: React.FC<BlockProps> = ({ block, index, handleKeyDown, handleInput }) => {
  return (
    <StyledContentBlock
      key={block._id}
      contentEditable
      aria-placeholder="글을 작성하려면 '스페이스' 키를, 명령어를 사용하려면 '/' 키를 누르세요."
      onKeyDown={(e) => handleKeyDown(e, index)}
      onInput={(e) => handleInput(e, index, e.currentTarget.innerText)}
      suppressContentEditableWarning
    >
      {block.content}
    </StyledContentBlock>
  );
};

const StyledContentBlock = styled.div`
  max-width: 100%;
  width: 100%;
  white-space: pre-wrap;
  word-break: break-word;
  caret-color: rgb(55, 53, 47);
  padding: 3px 2px;
  &:empty:before {
    content: attr(aria-placeholder);
    color: gray;
  }
`;

export default BlockList;
