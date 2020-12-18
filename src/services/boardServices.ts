import Board from '../types/board';
import UserModel from '../Models/user';
import BoardModel from '../Models/board';

export const createBoard = async (userId: string, data: Board) => {
  try {
    const userData = await UserModel.findById(userId);

    if (!userData) {
      return {
        status: '404',
        message: 'User not found',
      };
    }

    const boardId = await storeBoard(data);
    storeObjectIdInUser(userData._id, boardId);

    return {
      status: '201',
      message: 'Board created successfully',
    };
  } catch (err) {
    console.log(err);

    return {
      status: '400',
      message: 'There was an error',
    };
  }
};

const storeObjectIdInUser = async (userId: string, boardId: string) => {
  const result: any = await UserModel.findById(userId).select('boards');
  result.boards = [...result.boards, boardId];
  result.save();
};

const storeBoard = async (data: Board) => {
  const board = new BoardModel({
    title: data.title,
  });

  const result = await board.save();
  return result._id;
};
