import CardModel from '../Models/cards';
import BoardModel from '../Models/board';

export const createCard = async (boardId: string, data: any) => {
  try {
    const boardData: any = await BoardModel.findById(boardId).select('lists');
    const parentListData = !!boardData
      ? boardData.lists.filter((value: any) => value._id.toString() === data.ownedBy)
      : [];

    if (!parentListData.length) {
      return {
        status: 404,
        message: 'Id not found',
      };
    }

    const savedCardData = await storeInCardCollection(data);
    await storeInBoardCollection(savedCardData._id, boardId);

    return {
      status: 201,
      message: 'Card created successfully',
    };
  } catch (err) {
    console.log(err);

    return {
      status: 400,
      message: `There was an error while creating a card - ${err}`,
    };
  }
};

function storeInCardCollection(data: any) {
  const card = new CardModel({
    ownedBy: data.ownedBy,
    title: data.title,
  });

  return card.save();
}

async function storeInBoardCollection(cardId: string, boardId: string) {
  const boardData: any = await BoardModel.findById(boardId).select('cards');
  boardData.cards = [...boardData.cards, cardId];
  boardData.save();
}
