import UserModel from '../Models/user';

import { getBoardIfExists } from './misc';

export const getNonMemberUsers = async (boardId: string) => {
  try {
    const boardData = await getBoardIfExists(boardId, ['members', 'admin']);

    if (!boardData) {
      return {
        status: 404,
        message: 'ID not found',
      };
    }

    if (!boardData.members.length) {
      return {
        status: 404,
        message: 'No members',
      };
    }

    const userData = await UserModel.find({ _id: { $nin: boardData.members } }).select(['firstName', 'lastName']);

    return {
      status: 200,
      message: 'Sent all non member user',
      data: userData,
    };
  } catch (err) {
    return {
      status: 400,
      message: `There was an error - ${err}`,
    };
  }
};
