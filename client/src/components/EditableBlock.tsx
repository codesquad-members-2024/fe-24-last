import styled from 'styled-components';
import {
  Block,
  HeaderBlock,
  ImageBlock,
  UnorderedItemBlock,
  OrderedItemBlock,
  ParagraphBlock,
  OrderedListBlock,
} from '../constants';
import { HolderOutlined, PlusOutlined } from '@ant-design/icons';
import { ColumnGap, Flex, FlexRow } from '../styles/themes';

export interface EditableBlockProps {
  block: Block;
  index: number;
  handleInput: (e: React.KeyboardEvent<HTMLElement>, index: number, itemIndex?: number) => void;
  showPopup?: () => void;
}

export interface OrderedItemTagProps {
  item: OrderedItemBlock;
  itemIndex: number;
  index: number;
  handleInput: (e: React.KeyboardEvent<HTMLElement>, index: number, itemIndex?: number) => void;
}

const stopEnterDefaultEvent = (e: React.KeyboardEvent<HTMLElement>) => {
  if (e.key === 'Enter') e.preventDefault();
};

const HeaderTag = ({ block: { level, content }, index, handleInput }: EditableBlockProps & { block: HeaderBlock }) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  return (
    <BlockWrapper>
      <Icons>
        <IconWrapper>
          <HolderOutlined />
        </IconWrapper>
        <IconWrapper>
          <PlusOutlined />
        </IconWrapper>
      </Icons>
      <Tag
        contentEditable
        suppressContentEditableWarning
        onKeyUp={(e) => handleInput(e as React.KeyboardEvent<HTMLElement>, index)}
        onKeyDown={(e) => stopEnterDefaultEvent(e as React.KeyboardEvent<HTMLElement>)}
      >
        {content}
      </Tag>
    </BlockWrapper>
  );
};

const ParagraphTag = ({ block: { content }, index, handleInput }: EditableBlockProps & { block: ParagraphBlock }) => (
  <BlockWrapper>
    <Icons>
      <IconWrapper>
        <HolderOutlined />
      </IconWrapper>
      <IconWrapper>
        <PlusOutlined />
      </IconWrapper>
    </Icons>
    <div
      contentEditable
      suppressContentEditableWarning
      onKeyUp={(e) => handleInput(e, index)}
      onKeyDown={(e) => stopEnterDefaultEvent(e)}
      style={{ backgroundColor: 'aliceblue' }}
    >
      {content}
    </div>
  </BlockWrapper>
);

const UnorderedItemTag = ({
  block: { content },
  index,
  handleInput,
}: EditableBlockProps & { block: UnorderedItemBlock }) => (
  <BlockWrapper>
    <Icons>
      <IconWrapper>
        <HolderOutlined />
      </IconWrapper>
      <IconWrapper>
        <PlusOutlined />
      </IconWrapper>
    </Icons>
    <Flex>
      <div>•</div>
      <div
        contentEditable
        suppressContentEditableWarning
        onKeyUp={(e) => handleInput(e, index)}
        onKeyDown={(e) => stopEnterDefaultEvent(e)}
      >
        {content}
      </div>
    </Flex>
  </BlockWrapper>
);

const OrderedListTag = ({ block: { items }, index, handleInput }: EditableBlockProps & { block: OrderedListBlock }) => (
  <ColumnGap>
    {items.map((item: OrderedItemBlock, itemIndex: number) => (
      <div>
        <OrderedItemTag item={item} itemIndex={itemIndex} index={index} handleInput={handleInput} />
      </div>
    ))}
  </ColumnGap>
);

const OrderedItemTag = ({ item, itemIndex, index, handleInput }: OrderedItemTagProps) => {
  return (
    <BlockWrapper>
      <Icons>
        <IconWrapper>
          <HolderOutlined />
        </IconWrapper>
        <IconWrapper>
          <PlusOutlined />
        </IconWrapper>
      </Icons>
      <Flex>
        <OrderedListIndex>{`${itemIndex + 1}.`}</OrderedListIndex>
        <div
          key={`ol-${index}-${itemIndex}`}
          contentEditable
          suppressContentEditableWarning
          onKeyUp={(e) => handleInput(e, index, itemIndex)}
          onKeyDown={(e) => stopEnterDefaultEvent(e)}
        >
          {item.content}
        </div>
      </Flex>
    </BlockWrapper>
  );
};

const ImageTag = ({ block: { url, alt }, index, handleInput }: EditableBlockProps & { block: ImageBlock }) => (
  <div>
    <img src={url} alt={alt} />
    <p contentEditable suppressContentEditableWarning onKeyUp={(e) => handleInput(e, index)}>
      {alt}
    </p>
  </div>
);

export default function EditableBlock({ block, index, handleInput, showPopup }: EditableBlockProps) {
  const { type } = block;
  const blockTag = {
    header: <HeaderTag block={block as HeaderBlock} index={index} handleInput={handleInput} />,
    paragraph: <ParagraphTag block={block as ParagraphBlock} index={index} handleInput={handleInput} />,
    'ul-item': <UnorderedItemTag block={block as UnorderedItemBlock} index={index} handleInput={handleInput} />,
    'ordered-list': <OrderedListTag block={block as OrderedListBlock} index={index} handleInput={handleInput} />,
    image: <ImageTag block={block as ImageBlock} index={index} handleInput={handleInput} />,
  };

  return <>{blockTag[type]}</>;
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

const OrderedListIndex = styled.span`
  padding: 0 6px;
`;
