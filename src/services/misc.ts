import BoardModel from '../Models/board';

export async function doesBoardExist(boardId: string) {
  const result = await BoardModel.findById(boardId).select('_id');
  if (!result) {
    return false;
  }

  return true;
}
