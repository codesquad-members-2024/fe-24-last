interface BlockBase {
  type: string;
}

export interface HeaderBlock extends BlockBase {
  type: 'header';
  content: string;
  level: number;
}

export interface ParagraphBlock extends BlockBase {
  type: 'paragraph';
  content: string;
}

export interface UnorderedItemBlock extends BlockBase {
  type: 'ul-item';
  content: string;
}

export interface OrderedListBlock extends BlockBase {
  type: 'ordered-list';
  items: OrderedItemBlock[];
}

export interface OrderedItemBlock extends BlockBase {
  type: 'ol-item';
  content: string;
}

export interface ImageBlock extends BlockBase {
  type: 'image';
  url: string;
  alt: string;
}

export type Block = HeaderBlock | ParagraphBlock | UnorderedItemBlock | OrderedListBlock | ImageBlock;

export interface BlockControllerProps {
  blocks: Block[];
  setBlocks: (blocks: Block[]) => void;
  handleFetch: (blocks: Block[]) => void;
  handleContentChange: (block: Block, index: number) => void;
}