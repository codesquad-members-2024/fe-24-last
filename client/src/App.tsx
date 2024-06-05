import React, { useState, useCallback, useEffect, useRef } from 'react';
import { debounce } from 'lodash';
import styled from 'styled-components';

interface BlockBase {
  type: string;
}

interface HeaderBlock extends BlockBase {
  type: 'header';
  content: string;
  level: number;
}

interface ParagraphBlock extends BlockBase {
  type: 'paragraph';
  content: string;
}

interface ListBlock extends BlockBase {
  type: 'list';
  items: string[];
}

interface ImageBlock extends BlockBase {
  type: 'image';
  url: string;
  alt: string;
}

type Block = HeaderBlock | ParagraphBlock | ListBlock | ImageBlock;

interface BlockRendererProps {
  blocks: Block[];
  setBlocks: (blocks: Block[]) => void;
  handleFetch: (blocks: Block[]) => void;
  handleContentChange: (block: Block, index: number) => void;
}

const SERVER = import.meta.env.VITE_SERVER;
const FIRST_PAGE = 1;

const sendArticleRequestById = async (id: number) => {
  try {
    const response = await fetch(`${SERVER}/api/article/${id}`);

    if (!response.ok) throw new Error('Error');

    return response.json();
  } catch (error) {
    console.error(error);
  }
};

const updateArticleRequestById = async (id: number, blocks: Block[]) => {
  try {
    const response = await fetch(`${SERVER}/api/article/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content: blocks }),
    });

    if (!response.ok) throw new Error('Error');

    return response.json();
  } catch (error) {
    console.error(error);
  }
};

const stopEnterDefaultEvent = (e: React.KeyboardEvent<HTMLElement>) => {
  if (e.key === 'Enter') e.preventDefault();
};

const renderBlock = (
  block: Block,
  index: number,
  handleInput: (e: React.KeyboardEvent<HTMLElement>, index: number, itemIndex?: number) => void
) => {
  switch (block.type) {
    case 'header':
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
    case 'paragraph':
      return (
        <p
          contentEditable
          suppressContentEditableWarning
          onKeyUp={(e) => handleInput(e as React.KeyboardEvent<HTMLElement>, index)}
          onKeyDown={(e) => stopEnterDefaultEvent(e as React.KeyboardEvent<HTMLElement>)}
          style={{ backgroundColor: 'aliceblue' }}
        >
          {block.content}
        </p>
      );
    case 'list':
      return (
        <ul>
          {block.items.map((item, itemIndex) => (
            <li
              key={itemIndex}
              contentEditable
              suppressContentEditableWarning
              onKeyUp={(e) => handleInput(e as React.KeyboardEvent<HTMLElement>, index, itemIndex)}
              onKeyDown={(e) => stopEnterDefaultEvent(e as React.KeyboardEvent<HTMLElement>)}
            >
              {item}
            </li>
          ))}
        </ul>
      );
    case 'image':
      return (
        <div>
          <img src={block.url} alt={block.alt} />
          <p
            contentEditable
            suppressContentEditableWarning
            onKeyUp={(e) => handleInput(e as React.KeyboardEvent<HTMLElement>, index)}
          >
            {block.alt}
          </p>
        </div>
      );
    default:
      return null;
  }
};

const addNewBlock = (blocks: Block[], blockIndex: number) => {
  const previousArr = blocks.slice(0, blockIndex + 1);
  const nextArr = blocks.slice(blockIndex + 1);
  const array = [...previousArr, { type: 'paragraph', content: 'test' } as ParagraphBlock, ...nextArr];

  return array;
};

const isBlankBlock = (block: Block) => {
  if (!(block.type === 'paragraph')) return false;

  const { content } = block;
  return content === '';
};

const removeBlock = (blocks: Block[], blockIndex: number) => {
  const previousArr = blocks.slice(0, blockIndex);
  const nextArr = blocks.slice(blockIndex + 1);
  const removedArray = [...previousArr, ...nextArr];

  return removedArray;
};

const BlockRenderer: React.FC<BlockRendererProps> = ({ blocks, setBlocks, handleFetch, handleContentChange }) => {
  const handleInput = (e: React.KeyboardEvent<HTMLElement>, blockIndex: number, itemIndex?: number) => {
    let newBlocks = [...blocks];
    const block = newBlocks[blockIndex];

    if (e.key === 'Backspace' && isBlankBlock(block)) {
      newBlocks = removeBlock(blocks, blockIndex);
      setBlocks(newBlocks);
      handleFetch(newBlocks);
      return;
    }

    if (e.key === 'Enter') {
      newBlocks = addNewBlock(blocks, blockIndex);
      setBlocks(newBlocks);
      handleFetch(newBlocks);
      return;
    }

    if (!itemIndex || itemIndex < 1) {
      if ('content' in block) {
        const updatedBlock = { ...block, content: e.currentTarget.textContent || '' };
        newBlocks[blockIndex] = updatedBlock as typeof block;
      }
    } else {
      if ('items' in block) {
        const updatedItems = block.items.map((item, idx) =>
          idx === itemIndex ? e.currentTarget.textContent || '' : item
        );
        const updatedBlock = { ...block, items: updatedItems };
        newBlocks[blockIndex] = updatedBlock as typeof block;
      }
    }

    handleContentChange(newBlocks[blockIndex], blockIndex);
  };

  return (
    <BlocksWrapper>
      {blocks.map((block, index) => (
        <div key={index}>{renderBlock(block, index, handleInput)}</div>
      ))}
    </BlocksWrapper>
  );
};

export default function App() {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const clientBlocksRef = useRef<Block[]>([]);

  useEffect(() => {
    sendArticleRequestById(FIRST_PAGE).then(({ content }) => {
      setBlocks(content);
      clientBlocksRef.current = content;
    });
  }, []);

  const debouncedFetch = useCallback(
    debounce((updatedBlocks: Block[]) => {
      updateArticleRequestById(FIRST_PAGE, updatedBlocks).then(({ content }) => {
        setBlocks(content);
        clientBlocksRef.current = content;
      });
    }, 1500),
    []
  );

  const handleContentChange = (updatedBlock: Block, index: number) => {
    const newBlocks = [...blocks];
    newBlocks[index] = updatedBlock;
    clientBlocksRef.current[index] = updatedBlock;
    setBlocks(clientBlocksRef.current);
    debouncedFetch(clientBlocksRef.current);
  };

  return (
    <Wrapper>
      <ContentBox>
        <BlockRenderer
          blocks={blocks}
          setBlocks={setBlocks}
          handleFetch={debouncedFetch}
          handleContentChange={handleContentChange}
        />
      </ContentBox>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
`;

const ContentBox = styled.div`
  width: 708px;
  display: flex;
`;

const BlocksWrapper = styled.div`
  width: 100%;
`;
