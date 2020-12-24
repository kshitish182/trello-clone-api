import BoardModel from '../Models/board';

export const createList = async (boardId: string, data: any) => {
  try {
    const isBoardIdValid = await doesBoardExist(boardId);

    if (!isBoardIdValid) {
      return {
        status: 404,
        message: 'Id not found',
      };
    }

    const listData: any = await BoardModel.findById(boardId).select('lists');
    listData.lists = [...listData.lists, data];
    const savedBoardData = await listData.save();
    const savedListId = savedBoardData.lists[savedBoardData.lists.length - 1]._id;

    return {
      status: 200,
      message: 'Id found',
      data: {
        listId: savedListId,
      },
    };
  } catch (err) {
    console.log(err);

    return {
      status: 400,
      message: `There was an error while creating a list - ${err}`,
    };
  }
};

export const updateListLevel = async (boardId: string, data: { _id: string; level: number }) => {
  try {
    const isBoardIdValid = await doesBoardExist(boardId);

    if (!isBoardIdValid) {
      return {
        status: 404,
        message: 'Invalid board Id - not found',
      };
    }

    const boardData: any = await BoardModel.findById(boardId).select('lists');
    const [filterListById] = boardData.lists.filter((value: any) => data._id === value._id.toString());

    if (!filterListById) {
      return {
        status: 404,
        message: 'ListId not found',
      };
    }

    filterListById.level = data.level;
    await boardData.save();

    return {
      status: 200,
      message: 'Everything is ok',
    };
  } catch (err) {
    console.log(err);

    return {
      status: 400,
      message: `There was a error - ${err}`,
    };
  }
};

async function doesBoardExist(boardId: string) {
  const result = await BoardModel.findById(boardId).select('_id');
  if (!result) {
    return false;
  }

  return true;
}
