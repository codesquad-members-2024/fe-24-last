import styled from 'styled-components';
import { Block, HeaderBlock, ImageBlock, ListBlock, ParagraphBlock } from '../constants';
import { HolderOutlined, PlusOutlined } from '@ant-design/icons';
import { FlexRow } from '../styles/themes';

export interface EditableBlockProps {
  block: Block;
  index: number;
  handleInput: (e: React.KeyboardEvent<HTMLElement>, index: number, itemIndex?: number) => void;
  showPopup?: () => void;
}

const stopEnterDefaultEvent = (e: React.KeyboardEvent<HTMLElement>) => {
  if (e.key === 'Enter') e.preventDefault();
};

const HeaderTag = ({ block, index, handleInput }: EditableBlockProps & { block: HeaderBlock }) => {
  const Tag = `h${block.level}` as keyof JSX.IntrinsicElements;
  return (
    <Tag
      contentEditable
      suppressContentEditableWarning
      onKeyUp={(e) => handleInput(e as React.KeyboardEvent<HTMLElement>, index)}
      onKeyDown={(e) => stopEnterDefaultEvent(e as React.KeyboardEvent<HTMLElement>)}
    >
      {block.content}
    </Tag>
  );
};

const ParagraphTag = ({ block, index, handleInput }: EditableBlockProps & { block: ParagraphBlock }) => (
  <div
    contentEditable
    suppressContentEditableWarning
    onKeyUp={(e) => handleInput(e, index)}
    onKeyDown={(e) => stopEnterDefaultEvent(e)}
    style={{ backgroundColor: 'aliceblue' }}
  >
    {block.content}
  </div>
);

const ListTag = ({ block, index, handleInput }: EditableBlockProps & { block: ListBlock }) => (
  <ul>
    {block.items.map((item, itemIndex) => (
      <li
        key={itemIndex}
        contentEditable
        suppressContentEditableWarning
        onKeyUp={(e) => handleInput(e, index, itemIndex)}
        onKeyDown={(e) => stopEnterDefaultEvent(e)}
      >
        {item}
      </li>
    ))}
  </ul>
);

const ImageTag = ({ block, index, handleInput }: EditableBlockProps & { block: ImageBlock }) => (
  <div>
    <img src={block.url} alt={block.alt} />
    <p contentEditable suppressContentEditableWarning onKeyUp={(e) => handleInput(e, index)}>
      {block.alt}
    </p>
  </div>
);

export default function EditableBlock({ block, index, handleInput, showPopup }: EditableBlockProps) {
  const blockTag = {
    header: <HeaderTag block={block as HeaderBlock} index={index} handleInput={handleInput} />,
    paragraph: <ParagraphTag block={block as ParagraphBlock} index={index} handleInput={handleInput} />,
    list: <ListTag block={block as ListBlock} index={index} handleInput={handleInput} />,
    image: <ImageTag block={block as ImageBlock} index={index} handleInput={handleInput} />,
  };

  return (
    <BlockWrapper>
      <Icons>
        <IconWrapper>
          <HolderOutlined onClick={showPopup} />
        </IconWrapper>
        <IconWrapper>
          <PlusOutlined onClick={showPopup} />
        </IconWrapper>
      </Icons>
      {blockTag[block.type]}
    </BlockWrapper>
  );
}

const BlockWrapper = styled(FlexRow)`
  justify-content: flex-start;
`;

const Icons = styled(FlexRow)`
  margin-right: 10px;
  cursor: pointer;
  position: relative;
  transition: all;
`;
const IconWrapper = styled.div`
  opacity: 0;
  transition: opacity 0.3s;
  ${Icons}:hover & {
    opacity: 1;
  }
`;
