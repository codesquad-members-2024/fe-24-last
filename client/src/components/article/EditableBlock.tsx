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
import React, { createElement, useRef } from 'react';
import BlockTag from './BlockTag';
import { useCursorStore } from '../../stores/useCursorStore';

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
  const contentTagRef = useRef<HTMLDivElement | null>(null);
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  const plusIconRef = useRef<HTMLDivElement | null>(null);
  const handleInputWrapper = (props: { e: React.KeyboardEvent<HTMLElement>; index: number }) => {
    if (props.e.key === '/') {
      plusIconRef.current?.click();
    }
    handleInput(props);
  };

  const contentTag = createElement(
    Tag,
    {
      ref: contentTagRef,
      contentEditable: true,
      suppressContentEditableWarning: true,
      onKeyUp: (e: React.KeyboardEvent<HTMLElement>) => handleInputWrapper({ e, index }),
      onKeyDown: (e: React.KeyboardEvent<HTMLElement>) => stopEnterDefaultEvent(e),
      onFocus: () => handleFocus(index),
    },
    content
  );

  return <BlockTag {...{ contentTagRef, plusIconRef, contentTag }} />;
};

const ParagraphTag = ({
  block: { content },
  index,
  handleInput,
  handleFocus,
}: TagProps & { block: ParagraphBlock }) => {
  const contentTagRef = useRef<HTMLDivElement | null>(null);
  const plusIconRef = useRef<HTMLDivElement | null>(null);
  const handleInputWrapper = (props: { e: React.KeyboardEvent<HTMLElement>; index: number }) => {
    if (props.e.key === '/') {
      plusIconRef.current?.click();
      return;
    }
    handleInput(props);
  };

  const contentTag = (
    <StyledBlockTag
      ref={contentTagRef}
      contentEditable
      suppressContentEditableWarning
      onKeyUp={(e) => handleInputWrapper({ e: e as React.KeyboardEvent<HTMLElement>, index })}
      onKeyDown={(e) => stopEnterDefaultEvent(e)}
      onFocus={() => handleFocus(index)}
    >
      {content}
    </StyledBlockTag>
  );

  return <BlockTag {...{ contentTagRef, plusIconRef, contentTag }} />;
};

const UnorderedItemTag = ({
  block: { content },
  index,
  handleInput,
  handleFocus,
}: TagProps & { block: UnorderedItemBlock }) => {
  const contentTagRef = useRef<HTMLDivElement | null>(null);
  const plusIconRef = useRef<HTMLDivElement | null>(null);
  const handleInputWrapper = (props: { e: React.KeyboardEvent<HTMLElement>; index: number }) => {
    if (props.e.key === '/') {
      plusIconRef.current?.click();
    }
    handleInput(props);
  };
  const contentTag = (
    <Flex>
      <OrderedListIndex>•</OrderedListIndex>
      <div
        ref={contentTagRef}
        contentEditable
        suppressContentEditableWarning
        onKeyUp={(e) => handleInputWrapper({ e: e as React.KeyboardEvent<HTMLElement>, index })}
        onKeyDown={(e) => stopEnterDefaultEvent(e)}
        onFocus={() => handleFocus(index)}
      >
        {content}
      </div>
    </Flex>
  );

  return <BlockTag {...{ contentTagRef, plusIconRef, contentTag }} />;
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
  const contentTagRef = useRef<HTMLDivElement | null>(null);
  const plusIconRef = useRef<HTMLDivElement | null>(null);

  const handleInputWrapper = (props: { e: React.KeyboardEvent<HTMLElement>; index: number; itemIndex: number }) => {
    if (props.e.key === '/') {
      plusIconRef.current?.click();
    }
    handleInput(props);
  };

  const contentTag = (
    <Flex>
      <OrderedListIndex>{`${itemIndex + 1}.`}</OrderedListIndex>
      <div
        ref={contentTagRef}
        key={`ol-${index}-${itemIndex}`}
        contentEditable
        suppressContentEditableWarning
        onKeyUp={(e) => handleInputWrapper({ e: e as React.KeyboardEvent<HTMLElement>, index, itemIndex })}
        onKeyDown={(e) => stopEnterDefaultEvent(e)}
        onFocus={() => handleFocus(index)}
      >
        {item.content}
      </div>
    </Flex>
  );
  return <BlockTag {...{ contentTagRef, plusIconRef, contentTag }} />;
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

export default function EditableBlock({ block, index, handleInput }: EditableBlockProps) {
  const { type } = block;
  const { setBlockOffset } = useCursorStore();
  const handleFocus = (blockIndex: number) => setBlockOffset(blockIndex);

  const tagProps = { index, handleInput, handleFocus };

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
  width: 100%;
  padding: 3px 10px;
  white-space: pre-wrap;
  word-break: break-word;
`;
