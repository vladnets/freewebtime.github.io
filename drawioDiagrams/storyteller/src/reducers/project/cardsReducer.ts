import { ICard } from '../../api/project/ICard';
import { IAction } from '../../api/IAction';
import { IHash } from '../../api/IHash';
import { appConfig } from '../../config/appConfig';

export const cardsReducer = (state: IHash<ICard> = {}, action: IAction) => {
  
  switch (action.type) {
    case appConfig.Actions.Types.CARD_ADD: {
      const newCard: ICard = action.payload.newCard;
      state = {
        ...state,
        [newCard.id]: newCard,
      }
    } break;

    case appConfig.Actions.Types.CARD_DELETE: {
      const cardId: string = action.payload.cardId;
      state = {
        ...state
      }
      delete state[cardId];
    } break;

    case appConfig.Actions.Types.CARD_UPDATE: {
      const cardId: string = action.payload.cardId;
      const values: {} = action.payload.values;
      const card = state[cardId];
      if (card) {
        state = {
          ...state,
          [cardId]: {
            ...card,
            ...values,
          }
        }
      }
    } break;
  
    default: break;
  }
  
  return state;
}