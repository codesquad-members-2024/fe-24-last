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
import { ColumnGap, Flex } from '../styles/themes';
import React, { useEffect } from 'react';
import { CursorPosition } from '../hooks/useBlockController';
import { specifyPositionOfCursor } from '../helpers/specifyPositionOfCursor';
import BlockTag from './BlockTag';

export interface HandleInputProps {
  e: React.KeyboardEvent<HTMLElement>;
  index: number;
  itemIndex?: number;
  cursorPositionRef?: React.RefObject<{ node: Node | null; offset: number; blockOffset: number }>;
  updateCursorPosition?: (positionObj: CursorPosition) => void;
}

export interface EditableBlockProps {
  block: Block;
  index: number;
  handleInput: (props: HandleInputProps) => void;
  showPopup?: () => void;
  cursorPositionRef: React.RefObject<{ node: Node | null; offset: number; blockOffset: number }>;
  updateCursorPosition: (positionObj: CursorPosition) => void;
  isFocusedBlock: boolean;
}

export interface OrderedItemTagProps {
  item: OrderedItemBlock;
  itemIndex: number;
  index: number;
  handleInput: (props: HandleInputProps) => void;
}

const stopEnterDefaultEvent = (e: React.KeyboardEvent<HTMLElement>) => {
  if (e.key === 'Enter') e.preventDefault();
};

const HeaderTag = ({ block: { level, content }, index, handleInput }: EditableBlockProps & { block: HeaderBlock }) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  const contentTag = (
    <Tag
      contentEditable
      suppressContentEditableWarning
      onKeyUp={(e) => handleInput({ e: e as React.KeyboardEvent<HTMLElement>, index })}
      onKeyDown={(e) => stopEnterDefaultEvent(e as React.KeyboardEvent<HTMLElement>)}
    >
      {content}
    </Tag>
  );

  return <BlockTag {...{ contentTag }} />;
};

const ParagraphTag = ({
  block: { content },
  index,
  handleInput,
  cursorPositionRef,
  updateCursorPosition,
}: EditableBlockProps & { block: ParagraphBlock }) => {
  const contentTag = (
    <StyledBlockTag
      contentEditable
      suppressContentEditableWarning
      onKeyUp={(e) =>
        handleInput({ e: e as React.KeyboardEvent<HTMLElement>, index, cursorPositionRef, updateCursorPosition })
      }
      onKeyDown={stopEnterDefaultEvent}
      style={{ backgroundColor: 'aliceblue' }}
    >
      {content}
    </StyledBlockTag>
  );

  return <BlockTag {...{ contentTag }} />;
};

const UnorderedItemTag = ({
  block: { content },
  index,
  handleInput,
}: EditableBlockProps & { block: UnorderedItemBlock }) => {
  const contentTag = (
    <Flex>
      <OrderedListIndex>•</OrderedListIndex>
      <div
        contentEditable
        suppressContentEditableWarning
        onKeyUp={(e) => handleInput({ e: e as React.KeyboardEvent<HTMLElement>, index })}
        onKeyDown={(e) => stopEnterDefaultEvent(e)}
      >
        {content}
      </div>
    </Flex>
  );
  return <BlockTag {...{ contentTag }} />;
};

const OrderedListTag = ({ block: { items }, index, handleInput }: EditableBlockProps & { block: OrderedListBlock }) => (
  <ColumnGap>
    {items.map((item: OrderedItemBlock, itemIndex: number) => (
      <div key={`ol-wrapper-${index}-${itemIndex}`}>
        <OrderedItemTag item={item} itemIndex={itemIndex} index={index} handleInput={handleInput} />
      </div>
    ))}
  </ColumnGap>
);

const OrderedItemTag = ({ item, itemIndex, index, handleInput }: OrderedItemTagProps) => {
  const contentTag = (
    <Flex>
      <OrderedListIndex>{`${itemIndex + 1}.`}</OrderedListIndex>
      <div
        key={`ol-${index}-${itemIndex}`}
        contentEditable
        suppressContentEditableWarning
        onKeyUp={(e) => handleInput({ e: e as React.KeyboardEvent<HTMLElement>, index, itemIndex })}
        onKeyDown={(e) => stopEnterDefaultEvent(e)}
      >
        {item.content}
      </div>
    </Flex>
  );
  return <BlockTag {...{ contentTag }} />;
};

const ImageTag = ({ block: { url, alt }, index, handleInput }: EditableBlockProps & { block: ImageBlock }) => (
  <div>
    <img src={url} alt={alt} />
    <p
      contentEditable
      suppressContentEditableWarning
      onKeyUp={(e) => handleInput({ e: e as React.KeyboardEvent<HTMLElement>, index })}
    >
      {alt}
    </p>
  </div>
);

export default function EditableBlock({
  block,
  index,
  handleInput,
  showPopup,
  cursorPositionRef,
  updateCursorPosition,
  isFocusedBlock,
}: EditableBlockProps) {
  useEffect(() => {
    specifyPositionOfCursor({ cursorPositionRef, isFocusedBlock });
  }, [block]);

  const { type } = block;

  const tagProps = { index, handleInput, isFocusedBlock, cursorPositionRef, updateCursorPosition };

  const blockTag = {
    header: <HeaderTag block={block as HeaderBlock} {...tagProps} />,
    paragraph: <ParagraphTag block={block as ParagraphBlock} {...tagProps} />,
    'ul-item': <UnorderedItemTag block={block as UnorderedItemBlock} {...tagProps} />,
    'ordered-list': <OrderedListTag block={block as OrderedListBlock} {...tagProps} />,
    image: <ImageTag block={block as ImageBlock} {...tagProps} />,
  };

  return <>{blockTag[type]}</>;
}

const OrderedListIndex = styled.span`
  padding: 0 6px;
`;

const StyledBlockTag = styled.div`
  white-space: pre-wrap; /* 줄 바꿈과 공백을 그대로 렌더링 */
  word-break: break-word;
`;
