import { ReferencePath, ReferencePathItem } from '../api/project/ReferencePath';
import { IProject } from '../api/project/IProject';
import { IHash } from '../api/IHash';
import { appConfig } from '../config/appConfig';
import { CardType, ICard, IFunction, IPrimitive, IStructure } from '../api/project/ICard';
import { CardSocketType } from '../components/project/editors/cards/CardSocketView';

export const validateObject = (obj: ICard) => {
  if (!obj.name || obj.name === '') {
    obj.name = obj.id;
  }
  
  if (obj.namespace) {
    obj.fullId = `${obj.namespace}.${obj.id}`;
  }
}

export const createPrimitive = (values: {}) => {
  const result = <IPrimitive> {
    ...values,
    cardType: CardType.Primitive,
  }

  validateObject(result);

  return result;
}

export const createStructure = (values: {}) => {
  const result = <IStructure> {
    ...values,
    cardType: CardType.Structure,
  }

  validateObject(result);

  return result;
}

export const createFunction = (values: {}) => {
  const result = <IFunction> {
    ...values,
    cardType: CardType.Function,
  }

  validateObject(result);
  
  return result;
}

export const parsePath = (path: string): ReferencePath|undefined => {
  if (!path) {
    return undefined;
  }

  const parts = path.split('.');
  const result = parts.map((sPathItem: string): ReferencePathItem => {
    if (sPathItem.startsWith('[') && sPathItem.endsWith(']')) {
      const sValue = sPathItem.substring(1, sPathItem.length-2);
      const arrayIndex = Number(sValue);
      return arrayIndex !== NaN ? arrayIndex : 0;
    }

    return sPathItem;
  });

  return result;
}

export const pathToString = (path: ReferencePath): string|undefined => {
  if (path.length <= 0) {
    return undefined;
  }

  return path.join('.');
}

export const resolveReference = (targetId: string|undefined, cards: IHash<ICard>): ICard|undefined => {
  if (!targetId) {
    return undefined;
  }

  return cards[targetId];
}
export const resolveReferences = (refs: IHash<string>, cards: IHash<ICard>): IHash<ICard>|undefined => {
  const result = {}

  Object.keys(refs).map((refName: string) => {
    const targetId = refs[refName];
    const card = resolveReference(targetId, cards);
    if (card) {
      result[targetId] = card;
    }
  })

  return result;
}

export const getSubitems = (rootCard: ICard, cards: IHash<ICard>): IHash<ICard>|undefined => {
  const idList = getSubitemsIds(rootCard);

  if (idList) {
    const result = {}

    Object.keys(idList).map((cardId: string) => {
      const card = resolveReference(cardId, cards);

      if (card) {
        result[card.fullId] = card;
      }

    })

    return result;
  }

  return undefined;
}

export const getSubitemsIds = (rootCard: ICard): IHash<string>|undefined => {
  switch (rootCard.cardType) {
    case CardType.Structure: 
    case CardType.Function: {
      const structure = rootCard as IStructure;
      if (structure) {
        return structure.subitemsIdList;
      }
    }
  
    default: {
      return {}
    }
  }
}

export const getIconForCard = (cardType: CardType) => {
  return appConfig.CardIcons[cardType] || appConfig.CardIcons.default;
}

export const getCardSocketId = (socketType: CardSocketType, cardId: string) => {
  const socketId = socketType === CardSocketType.Input
    ? `input-socket-${cardId}`
    : `output-socket-${cardId}`
  ;
  
  return socketId;
}

