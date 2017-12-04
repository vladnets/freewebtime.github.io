import { IAction, IGenericAction } from '../../api/IAction';
import { IHash } from '../../api/IHash';
import { ICardboard } from '../../api/project/ICardboard';
import { cardboardReducer } from './cardboardReducer';

export const CardboardActions = {
  Types: {
    CARDBOARD_UPDATE: 'CARDBOARD_UPDATE',
    CARDBOARD_CREATE: 'CARDBOARD_CREATE',
    CARDBOARD_DELETE: 'CARDBOARD_DELETE',
  },

  CreateCardboard: (newCardboard: ICardboard): IAction => {
    return {
      type: CardboardActions.Types.CARDBOARD_CREATE,
      payload: newCardboard,
    }
  },
  DeleteCardboard: (cardboardId: string): IAction => {
    return {
      type: CardboardActions.Types.CARDBOARD_DELETE,
      payload: cardboardId,
    }
  },
  UpdateCardboard: (cardboardId: string, values: {}): IAction => {
    return {
      type: CardboardActions.Types.CARDBOARD_DELETE,
      payload: {cardboardId, values},
    }
  },
}

export const cardboardsReducer = (state: IHash<ICardboard> = {}, action: IAction) => {
  
  let isChanged;
  const newValues = {}

  switch (action.type) {
    
    case CardboardActions.Types.CARDBOARD_CREATE: {
      const newCardboard = action.payload as ICardboard;
      if (newCardboard) {
        const cardboardId = newCardboard.id;

        if (cardboardId) {
          newValues[cardboardId] = newCardboard;        
        }

      }

    } break;

    case CardboardActions.Types.CARDBOARD_DELETE: {
      const cardboardId = action.payload as string;
      if (cardboardId) {
        state = {
          ...state, 
        },
        delete state[cardboardId];
      }

    } break;
    case CardboardActions.Types.CARDBOARD_UPDATE: {
      if (action.payload) {
        const cardboardId = action.payload.cardboardId;
        const values = action.payload.values;
        
        if (cardboardId && values) {
          const cardboard = state[cardboardId];
          if (cardboard) {
            newValues[cardboardId] = cardboard;
          }

        }

      }

    } break;


    default: {
      Object.keys(state).map((cardboardId: string) => {
        const oldCardboard = state[cardboardId];
        const newCardboard = cardboardReducer(oldCardboard, action);
        if (oldCardboard !== newCardboard) {
          isChanged = true;
          newValues[cardboardId] = newCardboard;
        }
      })
    } break;
  }

  if (isChanged) {
    state = {
      ...state,
      ...newValues,
    }
  }

  return state;
}