export default interface Board {
  _id: String;
  title: String;
  createdOn?: String;
  isArchived?: boolean;
  lists: List[];
  card: Card[] | [];
}

export interface List {
  _id: String;
  name: String;
  level: number;
}

export interface Card {
  _id: String;
  ownedBy: string;
  title: string;
  description: string;
  assignee: string;
}
