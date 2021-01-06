import CardModel from '../Models/cards';

export async function findById(cardId: string, document: string[] = []): Promise<any> {
  return CardModel.findById(cardId).select(document);
}

// set initial Card Content
export async function setCardContent(payload: { title: string; ownedBy: string; assignee: string }): Promise<any> {
  const createCard = new CardModel({
    title: payload.title,
    ownedBy: payload.ownedBy,
    assignee: payload.assignee,
  });

  return createCard.save();
}

export async function updateCardContent(
  cardId: string,
  payload: { title: string; description: string; assignee: string }
): Promise<any> {
  const cardData = await findById(cardId, ['title', 'description', 'assignee']);
  if (!cardData) {
    return null;
  }

  cardData.title = payload.title;
  cardData.description = payload.description;
  cardData.assignee = payload.assignee;

  return cardData.save();
}
