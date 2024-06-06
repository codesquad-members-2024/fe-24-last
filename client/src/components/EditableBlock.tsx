import { Block, HeaderBlock, ImageBlock, ListBlock, ParagraphBlock } from '../constants';

interface EditableBlockProps {
  block: Block;
  index: number;
  handleInput: (e: React.KeyboardEvent<HTMLElement>, index: number, itemIndex?: number) => void;
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
  <p
    contentEditable
    suppressContentEditableWarning
    onKeyUp={(e) => handleInput(e, index)}
    onKeyDown={(e) => stopEnterDefaultEvent(e)}
    style={{ backgroundColor: 'aliceblue' }}
  >
    {block.content}
  </p>
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

export default function EditableBlock({ block, index, handleInput }: EditableBlockProps) {
  const blockTag = {
    header: <HeaderTag block={block as HeaderBlock} index={index} handleInput={handleInput} />,
    paragraph: <ParagraphTag block={block as ParagraphBlock} index={index} handleInput={handleInput} />,
    list: <ListTag block={block as ListBlock} index={index} handleInput={handleInput} />,
    image: <ImageTag block={block as ImageBlock} index={index} handleInput={handleInput} />,
  };

  return blockTag[block.type];
}
