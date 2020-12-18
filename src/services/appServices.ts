import UserModal from '../Models/user';
import Board, { List } from '../types/board';
import BoardModel, { List as ListModel } from '../Models/board';

// export const storeBoard = async (userId: string, data: Board) => {
//   try {
//     const board = new BoardModel({
//       title: data.title,
//       isArchived: data.isArchived,
//       lists: data.lists,
//     });

//     await board.save();
//     const user =

//     return {
//       status: '201',
//       message: 'Board created successfully',
//     };

//   } catch (err) {
//     console.log(err);

//     return {
//       status: '400',
//       message: 'There was an error',
//     };
//   }
// };

// export const getBoards = async () => {
//   const result = await BoardModel.find().select(['title', '_id', 'isArchived', 'createdOn', 'lists']);
//   return result;
// };

export const storeList = async (data: any) => {
  const result = (await BoardModel.findById(data.params.id).select('lists')) as any;
  const updatedList = [...result.lists, { name: data.body.name, level: data.body.level }];
  result.lists = updatedList;
  console.log(result);
  result.save();
};

export const storeCard = async (data: any) => {
  const { ownedBy, title } = data.body;
  const result = (await BoardModel.findById(data.params.id).select('lists')) as any;

  if (!result) {
    return 'List not found';
  }

  // console.log(result.lists);

  const listItem = result.lists.id('2123123');

  if (!listItem) {
    return 'List not found';
  }

  return 'Action completed';
};
