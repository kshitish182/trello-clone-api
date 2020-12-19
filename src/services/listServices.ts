import BoardModel from '../Models/board';

export const createList = async (boardId: string, data: any) => {
  try {
    const boardData = await BoardModel.findById(boardId).select('_id');

    if (!boardData) {
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
