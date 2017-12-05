import { IHash } from '../api/IHash';
import { ICard } from '../api/project/ICard';
import { ICardboard, ICardboardItem } from '../api/project/ICardboard';
import { getSubitemsIds, resolveReference } from '../helpers/projectHeler';

const createCardboardSubcards = (cards: IHash<ICard>, rootCard: ICard, cardboard: ICardboard) => {
  const subcardsIds = getSubitemsIds(rootCard);
  
  if (!subcardsIds) {
    return;
  }

  Object.keys(subcardsIds).map((subcardId: string, index: number) => {
    
    const subcard = resolveReference(subcardId, cards);

    if (subcard) {
      const subitem: ICardboardItem = {
        id: subcardId,
        name: subcard.name,
  
        objectId: subcardId,
        isCollapsed: false,
      }

      cardboard.items[subcardId] = subitem;

      createCardboardSubcards(cards, subcard, cardboard);
    }
    
  })

}

export const getRootItems = (cards: IHash<ICard>): IHash<ICard> => {
  
    const result: IHash<ICard> = {}
  
    Object.keys(cards).map((cardId: string) => {
      const card = cards[cardId];
      if (!card.namespace || card.namespace === '') {
        result[cardId] = card;
      }
    })
  
    return result;
  }
  export const getRootItemsIds = (cards: IHash<ICard>): IHash<string> => {
    
    const rootItems = getRootItems(cards);
    const result: IHash<string> = {}
  
    Object.keys(rootItems).map((cardId: string) => {
      result[cardId] = cardId;
    })
  
    return result;
  }
      
export const createCardboards = (cards: IHash<ICard>): IHash<ICardboard> => {
  const cardboards: IHash<ICardboard> = {}

  Object.keys(cards).map((cardId: string, index: number) => {
    const card = cards[cardId];
    const cardboardId = card.namespace;
    if (!cardboardId) {
      return;
    }

    let cardboard = cardboards[cardboardId];
    
    if (!cardboard) {
      cardboard = {
        id: cardboardId,
        items: {},
        rootId: cardboardId,
      }
      cardboards[cardboardId] = cardboard;
    }

    const placementKoeff = 23;
    const placementKoeff2 = 11;
    const itemPosition = {
      x: placementKoeff * index, 
      y: placementKoeff2 * index
    };
    const itemSize = {
      x: 350,
      y: 180,
    }

    const cardboardItem: ICardboardItem = {
      id: cardId,
      name: card.name,

      objectId: cardId,
      isCollapsed: false,
      position: itemPosition,
      size: itemSize,
    }

    cardboard.items[cardId] = cardboardItem;
    createCardboardSubcards(cards, card, cardboard);
  })  

  return cardboards;
}