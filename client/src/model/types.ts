export interface BlockChildren {
  type: string;
  content: string;
}

export interface Block {
  type: string;
  content: string;
}

export interface Article {
  title: string;
  blocklist: [Block] | [];
  parent_id: string | null;
}
