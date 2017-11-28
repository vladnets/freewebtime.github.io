import { areObjectsEqual } from '../../helpers';
import { initialCardboards } from '../../config/initialState';
import { IAction } from '../../api/IAction';
import { IHash } from '../../api/IHash';
import { ICardboard } from '../../api/project/ICardboard';
import { appConfig } from '../../config/appConfig';
import { cardboardReducer } from './cardboardReducer';

export const cardboardsReducer = (state: IHash<ICardboard> = initialCardboards, action: IAction) => {
  
  switch (action.type) {
    case appConfig.Actions.Types.CARDBOARD_ADD: {
      const newCardboard: ICardboard = action.payload;
      state = {
        ...state,
        [newCardboard.id]: newCardboard,
      }
    } break;

    case appConfig.Actions.Types.CARDBOARD_DELETE: {
      const cardboardId: string = action.payload;
      state = {
        ...state
      }
      delete state[cardboardId];
    } break;

    case appConfig.Actions.Types.CARDBOARD_UPDATE: {
      const cardboardId: string = action.payload.cardboardId;
      const values: {} = action.payload.values;
      const cardboard = state[cardboardId];
      if (cardboard) {
        state = {
          ...state,
          [cardboardId]: {
            ...cardboard,
            ...values,
          }
        }
      }
    } break;
  
    default: {
      let isChanged = false;
      const changedCardboards = {};
      Object.keys(state).map((cardboardId: string, index: number) => {
        const oldCardboard = state[cardboardId];
        if (oldCardboard) {
          const newCardboard = cardboardReducer(oldCardboard, action);
          if (!areObjectsEqual(oldCardboard, newCardboard)) {
            isChanged = true;
            changedCardboards[cardboardId] = newCardboard;
          }
        }
      })

      if (isChanged) {
        state = {
          ...state,
          ...changedCardboards
        }
      }

    } break;
  }
  
  return state;
}