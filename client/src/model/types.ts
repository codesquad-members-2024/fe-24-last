export interface BlockChildren {
  type: string;
  content: string;
}

export interface Block {
  _id: string;
  type: string;
  content: string;
}

export interface Article {
  _id: string;
  title: string;
  blocklist: [Block] | [];
  parent_id: string | null;
}
