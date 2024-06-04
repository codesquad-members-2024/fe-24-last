import React, { useState, useCallback, useEffect } from 'react';
import { throttle } from 'lodash';

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
  handleContentChange: (block: Block, index: number) => void;
}

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

const renderBlock = (
  block: Block,
  index: number,
  handleInput: (e: React.FormEvent<HTMLElement>, index: number, itemIndex?: number) => void
) => {
  switch (block.type) {
    case 'header':
      const Tag = `h${block.level}` as keyof JSX.IntrinsicElements;
      return (
        <Tag
          contentEditable
          suppressContentEditableWarning
          onInput={(e) => handleInput(e as React.FormEvent<HTMLElement>, index)}
        >
          {block.content}
        </Tag>
      );
    case 'paragraph':
      return (
        <p
          contentEditable
          suppressContentEditableWarning
          onInput={(e) => handleInput(e as React.FormEvent<HTMLElement>, index)}
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
              onInput={(e) => handleInput(e as React.FormEvent<HTMLElement>, index, itemIndex)}
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
            onInput={(e) => handleInput(e as React.FormEvent<HTMLElement>, index)}
          >
            {block.alt}
          </p>
        </div>
      );
    default:
      return null;
  }
};

const BlockRenderer: React.FC<BlockRendererProps> = ({ blocks, handleContentChange }) => {
  const handleInput = (e: React.FormEvent<HTMLElement>, blockIndex: number, itemIndex?: number) => {
    const newBlocks = [...blocks];
    const block = newBlocks[blockIndex];

    if (itemIndex === undefined) {
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
    <div>
      {blocks.map((block, index) => (
        <div key={index}>{renderBlock(block, index, handleInput)}</div>
      ))}
    </div>
  );
};

const SERVER = import.meta.env.VITE_SERVER;
const FIRST_PAGE = 1;

export default function App() {
  const [blocks, setBlocks] = useState<Block[]>([]);

  useEffect(() => {
    sendArticleRequestById(FIRST_PAGE).then(({ content }) => setBlocks(content));
  }, []);

  const throttledFetch = useCallback(
    throttle((updatedBlocks: Block[]) => {
      updateArticleRequestById(FIRST_PAGE, updatedBlocks).then(({ content }) => setBlocks(content));
    }, 1500),
    []
  );

  const handleContentChange = (updatedBlock: Block, index: number) => {
    const newBlocks = [...blocks];
    newBlocks[index] = updatedBlock;
    setBlocks(newBlocks);
    throttledFetch(newBlocks);
  };

  return (
    <div>
      <BlockRenderer blocks={blocks} handleContentChange={handleContentChange} />
    </div>
  );
}
