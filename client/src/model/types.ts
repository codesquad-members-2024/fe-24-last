export interface Element {
  _id: string;
  type: string;
  content: string;
}

export interface Block {
  _id: string;
  columnList: [[Element]];
}

export interface Article {
  _id: string;
  title: string;
  blockList: [Block] | [];
  parent_id: string | null;
}

export interface ElementIndexInfo {
  blockIndex: number;
  columnIndex: number;
  elementIndex: number;
}
