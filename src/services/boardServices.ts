import UserModel from '../Models/user';
import { getBoardIfExists } from './misc';
import BoardModel from '../Models/board';

export const createBoard = async (userId: string, data: { title: string }) => {
  try {
    const userData = await UserModel.findById(userId);

    if (!userData) {
      return {
        status: 404,
        message: 'User not found',
      };
    }

    const boardId = await storeBoard(userId, data);
    storeObjectIdInUser(userData._id, boardId);

    return {
      status: 201,
      message: 'Board created successfully',
      data: {
        boardId: boardId,
      },
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

const storeBoard = async (userId: string, data: { title: string }) => {
  const board = new BoardModel({
    title: data.title,
    admin: userId,
    members: [userId],
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

export const addMembersInBoard = async (boardId: string, data: { _id: string }) => {
  try {
    const boardData = await getBoardIfExists(boardId, ['members']);

    if (!boardData) {
      return {
        status: 404,
        message: 'ID not found',
      };
    }

    // check if user already exists as a member
    const filteredUserId = boardData.members.filter((value: any) => value._id.toString() === data._id);

    if (filteredUserId.length) {
      return {
        status: 403,
        message: 'User already exists',
      };
    }

    boardData.members = [...boardData.members, data._id];
    await boardData.save();

    return {
      status: 200,
      message: 'User saved successfully',
    };
  } catch (err) {
    return {
      status: 400,
      message: `There was an error - ${err}`,
    };
  }
};
