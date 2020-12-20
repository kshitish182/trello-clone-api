import mongoose from 'mongoose';
import Board from '../types/board';
import UserModel from '../Models/user';
import BoardModel from '../Models/board';

export const createBoard = async (userId: string, data: Board) => {
  try {
    const userData = await UserModel.findById(userId);

    if (!userData) {
      return {
        status: 404,
        message: 'User not found',
      };
    }

    const boardId = await storeBoard(data);
    storeObjectIdInUser(userData._id, boardId);

    return {
      status: 201,
      message: 'Board created successfully',
    };
  } catch (err) {
    console.log(err);

    return {
      status: 400,
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

export const getBoard = async (boardId: string) => {
  try {
    // TODO: Refactor this logic
    // Convert list into a seperate collection

    const boardData: any = await BoardModel.findById(boardId).select(['title', 'cards', 'lists']).populate('cards');
    const sortedList = boardData.lists.sort((value: any, nextValue: any) => value.level - nextValue.level);
    const appendedList = appendCardInList(sortedList, boardData.cards);
    const responseData = {
      _id: boardData._id,
      title: boardData.title,
      lists: appendedList,
    };

    return {
      status: 200,
      message: 'Retrieved all the board',
      data: responseData,
    };
  } catch (err) {
    return {
      status: 400,
      message: `There was an error - ${err}`,
    };
  }
};

const appendCardInList = (sortedList: any, cardData: any) => {
  return sortedList.map((list: any) => {
    const filteredCardId = cardData.filter((card: any) => list._id.toString() === card.ownedBy);

    return { ...list.toObject(), cards: filteredCardId };
  });
};
