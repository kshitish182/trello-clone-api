import BoardModel from '../Models/board';

// Use "getBoardIfExists" and remove this
export async function doesBoardExist(boardId: string) {
  const result = await BoardModel.findById(boardId).select('_id');
  if (!result) {
    return false;
  }

  return true;
}

export async function getBoardIfExists(boardId: string, document: String[] = []) {
  if (!document.length) {
    return doesBoardExist(boardId);
  }

  const result: any = await BoardModel.findById(boardId).select(document);

  if (!result) {
    return null;
  }

  return result;
}
