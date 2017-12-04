import { IAction } from '../../api/IAction';
import { ICardboard, ICardboardAction, ICardboardItem } from '../../api/project/ICardboard';
import { v4 } from 'node-uuid';
import { IHash } from '../../api/IHash';
import { cardboardItemsReducer } from './cardboardItemsReducer';

const initialRootId = v4();
const initialCardboard: ICardboard = {
  id: initialRootId,
  rootId: initialRootId,
  items: {},
}


export const cardboardReducer = (state: ICardboard = initialCardboard, action: IAction) => {
  const values: any = {}
  let isChanged;

  if (action.payload && action.payload.cardboardId) {
    const cardboardId = action.payload.cardboardId;


    if (cardboardId === state.id) {
      const oldItems = state.items;
      const newItems = cardboardItemsReducer(oldItems, action);

      if (oldItems !== newItems) {
        isChanged = true;
        values.items = newItems;
      }

    }

  }
  else {
    const oldItems = state.items;
    const newItems = cardboardItemsReducer(oldItems, action);

    if (oldItems !== newItems) {
      isChanged = true;
      values.items = newItems;
    }

  }

  if (isChanged) {
    state = {
      ...state,
      ...values,
    }
  }

  return state;
}
