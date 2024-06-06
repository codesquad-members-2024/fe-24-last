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

export interface ListBlock extends BlockBase {
  type: 'list';
  items: string[];
}

export interface ImageBlock extends BlockBase {
  type: 'image';
  url: string;
  alt: string;
}

export type Block = HeaderBlock | ParagraphBlock | ListBlock | ImageBlock;
