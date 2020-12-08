import Board, { List } from '../types/board';
import BoardModel from '../Models/board';

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

// export const updateList = (data: List) => {
//   try {
//     const id = BoardModel.findById(data.id);

//     }
//   }
// }
