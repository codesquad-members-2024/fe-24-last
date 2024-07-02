import { MutableRefObject } from 'react';

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
  clientBlockRef: MutableRefObject<Block[]>;
  blocks: Block[];
  setBlocks: (blocks: Block[]) => void;
  handleFetch: (blocks: Block[], option?: boolean) => void;
}

export interface Article {
  _id: string;
  title: string;
  content: Block[];
  updatedAt: string;
}

export interface TeamspaceDescription {
  _id: string;
  title: string;
  articles: ArticleDescription[];
}

export interface ArticleDescription {
  _id: string;
  title: string;
  icon: string;
}

export interface UserDescription {
  nickname: string;
  isActive: boolean;
}

export const LOGIN_PATH = '/login';
export const REGISTRATION_PATH = '/registration';
export const TEAMSPACES_PATH = '/teamspaces';
export const TEAMSPACE_PATH = '/api/teamspace';
export const ARTICLE_PATH = '/article';
