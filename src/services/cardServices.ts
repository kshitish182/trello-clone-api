import { doesBoardExist } from './misc';
import CardModel from '../Models/cards';
import BoardModel from '../Models/board';
import { setCardContent, updateCardContent } from '../DAO/card.dao';

export const createCard = async (boardId: string, data: { title: string; ownedBy: string }) => {
  try {
    const boardData: any = await BoardModel.findById(boardId).select(['lists', 'admin']);
    const parentListData = !!boardData
      ? boardData.lists.filter((value: any) => value._id.toString() === data.ownedBy)
      : [];

    if (!parentListData.length) {
      return {
        status: 404,
        message: 'Id not found',
      };
    }

    const savedCardData = await setCardContent({ ...data, assignee: boardData.admin });
    await storeInBoardCollection(savedCardData._id, boardId);

    return {
      status: 201,
      message: 'Card created successfully',
      data: {
        _id: savedCardData._id,
        assignee: boardData.admin,
      },
    };
  } catch (err) {
    console.log(err);

    return {
      status: 400,
      message: `There was an error while creating a card - ${err}`,
    };
  }
};

async function storeInBoardCollection(cardId: string, boardId: string) {
  const boardData: any = await BoardModel.findById(boardId).select('cards');
  boardData.cards = [...boardData.cards, cardId];
  boardData.save();
}

export const updateCardOwner = async (boardId: string, data: { _id: string; ownedBy: string }) => {
  try {
    const isIdValid = await doesBoardExist(boardId);

    if (!isIdValid) {
      return {
        status: 404,
        message: 'Invalid board Id - not found',
      };
    }

    const cardData: any = await CardModel.findById(data._id).select('ownedBy');

    if (!cardData) {
      return {
        status: 404,
        message: 'Card id not found',
      };
    }

    cardData.ownedBy = data.ownedBy;
    await cardData.save();

    return {
      status: 200,
      message: 'Everything is OK',
    };
  } catch (err) {
    console.log(err);

    return {
      status: 400,
      error: `There was an error - ${err}`,
    };
  }
};

// new implementation

export async function update(cardId: string, payload: { title: string; description: string; assignee: string }) {
  try {
    const cardData = await updateCardContent(cardId, payload);
    if (!cardData) {
      return {
        status: 404,
        message: 'Card id not found',
      };
    }

    return {
      status: 200,
      message: 'Card is updated',
    };
  } catch (err) {
    return {
      status: 400,
      message: `Something went wrong - ${err}`,
    };
  }
}
