import { IAction } from '../../api/IAction';
import { IHash } from '../../api/IHash';
import { ICard } from '../../api/project/ICard';
import { appConfig } from '../../config/appConfig';

export const cardsReducer = (state: IHash<ICard> = {}, action: IAction) => {
  
  switch (action.type) {
    case appConfig.Actions.Types.CARD_ADD: {
      const newCard = action.payload as ICard;
      if (newCard) {
        state = {
          ...state,
          [newCard.fullId]: newCard,
        }
      }
    } break;
  
    case appConfig.Actions.Types.CARD_DELETE: {
      const cardId = action.payload;
      state = {
        ...state,
      }
      delete state[cardId];
    } break;
  
    case appConfig.Actions.Types.CARD_UPDATE: {
      if (action.payload) {
        const cardId = action.payload.cardId;
        const values = action.payload.values;
        const oldCard = state[cardId];

        console.log('card update', cardId, values, oldCard, state);

        if (oldCard) {
          const newCard = {
            ...oldCard,
            ...values
          };
          state = {
            ...state,
            [cardId]: newCard,
          }
        }
      }
    } break;
  
    default: break;
  }
  
  return state;
}