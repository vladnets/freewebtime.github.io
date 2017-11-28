import { areObjectsEqual } from '../../helpers';
import { cardsReducer } from './cardsReducer';
import { IAction } from '../../api/IAction';
import { ICardboard } from '../../api/project/ICardboard';
import { appConfig } from '../../config/appConfig';

export const cardboardReducer = (state: ICardboard, action: IAction) => {
  
  let isChanged = false;
  const changedCards = {};

  const oldCards = state.cards;

  switch (action.type) {
    case appConfig.Actions.Types.CARD_ADD: {
      const cardboardId: string = action.payload.cardboardId;
      if (cardboardId !== state.id) {
        return;
      }
    } break;

    case appConfig.Actions.Types.CARD_DELETE: {
      const cardboardId: string = action.payload.cardboardId;
      if (cardboardId !== state.id) {
        return;
      }
    } break;

    case appConfig.Actions.Types.CARD_UPDATE: {
      const cardboardId: string = action.payload.cardboardId;
      if (cardboardId !== state.id) {
        return;
      }
    } break;
  
    default: break;
  }

  const newCards = cardsReducer(state.cards, action);

  if (!areObjectsEqual(oldCards, newCards)) {
    state = {
      ...state,
      cards: newCards,
    }
  }

  return state;
}