import Board from './board';
export default interface Users {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  joinedDate?: string;
  boards?: Pick<Board, 'title' | '_id'>;
}
