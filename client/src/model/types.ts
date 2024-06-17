export interface BlockChildren {
  _id: string;
  type: string;
  content: string;
}

export interface Block {
  _id: string;
  element: [[BlockChildren]];
}

export interface Article {
  _id: string;
  title: string;
  blocklist: [Block] | [];
  parent_id: string | null;
}
