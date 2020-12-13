import Board, { List } from '../types/board';
import BoardModel, { List as ListModel } from '../Models/board';

export const storeBoard = async (data: Board) => {
  try {
    const board = new BoardModel({
      title: data.title,
      isArchived: data.isArchived,
      lists: data.lists,
    });

    const result = ((await board.save()) as unknown) as Board;
    const { title, isArchived, _id, lists } = result;

    return {
      status: '201',
      message: 'Board created successfully',
      payload: { title, isArchived, _id, lists },
    };
  } catch (err) {
    console.log(err);

    return {
      status: '400',
      message: 'There was an error',
    };
  }
};

export const getBoards = async () => {
  const result = await BoardModel.find().select(['title', '_id', 'isArchived', 'createdOn', 'lists']);
  console.log(result);

  return result;
};

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
