import styled from 'styled-components';
import {
  Block,
  HeaderBlock,
  ImageBlock,
  UnorderedItemBlock,
  OrderedItemBlock,
  ParagraphBlock,
  OrderedListBlock,
} from '../../constants';
import { ColumnGap, Flex } from '../../styles/themes';
import React, { useEffect, useLayoutEffect } from 'react';
import { CursorPosition, specifyPositionOfCursor } from '../../helpers/cursorHelpers';
import BlockTag from './BlockTag';
import { useCursorStore } from '../../stores/cursorStore';

export interface HandleInputProps {
  e: React.KeyboardEvent<HTMLElement>;
  index: number;
  itemIndex?: number;
}

export interface EditableBlockProps {
  block: Block;
  index: number;
  handleInput: (props: HandleInputProps) => void;
  showPopup?: () => void;
}

export interface TagProps extends EditableBlockProps {
  handleFocus: (blockIndex: number) => void;
}

export interface OrderedItemTagProps {
  item: OrderedItemBlock;
  itemIndex: number;
  index: number;
  handleInput: (props: HandleInputProps) => void;
  handleFocus: (blockIndex: number) => void;
}

const stopEnterDefaultEvent = (e: React.KeyboardEvent<HTMLElement>) => {
  if (e.key === 'Enter') e.preventDefault();
};

const HeaderTag = ({
  block: { level, content },
  index,
  handleInput,
  handleFocus,
}: TagProps & { block: HeaderBlock }) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  const contentTag = (
    <Tag
      contentEditable
      suppressContentEditableWarning
      onKeyUp={(e) => handleInput({ e: e as React.KeyboardEvent<HTMLElement>, index })}
      onKeyDown={(e) => stopEnterDefaultEvent(e as React.KeyboardEvent<HTMLElement>)}
      onFocus={() => handleFocus(index)}
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
  handleFocus,
}: TagProps & { block: ParagraphBlock }) => {
  const contentTag = (
    <StyledBlockTag
      contentEditable
      suppressContentEditableWarning
      onKeyUp={(e) => handleInput({ e: e as React.KeyboardEvent<HTMLElement>, index })}
      onKeyDown={(e) => stopEnterDefaultEvent(e)}
      onFocus={() => handleFocus(index)}
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
  handleFocus,
}: TagProps & { block: UnorderedItemBlock }) => {
  const contentTag = (
    <Flex>
      <OrderedListIndex>•</OrderedListIndex>
      <div
        contentEditable
        suppressContentEditableWarning
        onKeyUp={(e) => handleInput({ e: e as React.KeyboardEvent<HTMLElement>, index })}
        onKeyDown={(e) => stopEnterDefaultEvent(e)}
        onFocus={() => handleFocus(index)}
      >
        {content}
      </div>
    </Flex>
  );

  return <BlockTag {...{ contentTag }} />;
};

const OrderedListTag = ({
  block: { items },
  index,
  handleInput,
  handleFocus,
}: TagProps & { block: OrderedListBlock }) => (
  <ColumnGap>
    {items.map((item: OrderedItemBlock, itemIndex: number) => (
      <div key={`ol-wrapper-${index}-${itemIndex}`}>
        <OrderedItemTag
          item={item}
          itemIndex={itemIndex}
          index={index}
          handleInput={handleInput}
          handleFocus={handleFocus}
        />
      </div>
    ))}
  </ColumnGap>
);

const OrderedItemTag = ({ item, itemIndex, index, handleInput, handleFocus }: OrderedItemTagProps) => {
  const contentTag = (
    <Flex>
      <OrderedListIndex>{`${itemIndex + 1}.`}</OrderedListIndex>
      <div
        key={`ol-${index}-${itemIndex}`}
        contentEditable
        suppressContentEditableWarning
        onKeyUp={(e) => handleInput({ e: e as React.KeyboardEvent<HTMLElement>, index, itemIndex })}
        onKeyDown={(e) => stopEnterDefaultEvent(e)}
        onFocus={() => handleFocus(index)}
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

export default function EditableBlock({ block, index, handleInput, showPopup }: EditableBlockProps) {
  const { type } = block;
  const { cursorPosition, setCursorPosition } = useCursorStore();
  const isFocusedBlock = index === cursorPosition.blockOffset;
  const handleFocus = (blockIndex: number) => setCursorPosition({ blockOffset: blockIndex });
  const tagProps = { index, handleInput, handleFocus };

  useEffect(() => {
    specifyPositionOfCursor({ cursorPosition, isFocusedBlock });
  }, [block]);

  const blockTag = {
    header: <HeaderTag block={block as HeaderBlock} {...tagProps} />,
    paragraph: <ParagraphTag block={block as ParagraphBlock} {...tagProps} />,
    'ul-item': <UnorderedItemTag block={block as UnorderedItemBlock} {...tagProps} />,
    'ordered-list': <OrderedListTag block={block as OrderedListBlock} {...tagProps} />,
    image: <ImageTag block={block as ImageBlock} {...tagProps} />,
  };

  return <>{blockTag[type]}</>;
}

export const OrderedListIndex = styled.span`
  padding: 0 6px;
`;

export const StyledBlockTag = styled.div`
  white-space: pre-wrap;
  word-break: break-word;
`;
