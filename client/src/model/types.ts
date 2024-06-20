export interface BlockChildren {
  _id: string;
  type: string;
  content: string;
}

export interface Block {
  _id: string;
  block: [[BlockChildren]];
}

export interface Article {
  _id: string;
  title: string;
  blockList: [Block] | [];
  parent_id: string | null;
}
