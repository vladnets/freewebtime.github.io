import { ICardboardItem } from '../../api/project/ICardboard';
import { IHash } from '../../api/IHash';
import { IAction } from '../../api/IAction';

export const CardboardItemActions = {
  Types: {
    CARDBOARD_ITEM_CREATE: 'CARDBOARD_ITEM_CREATE',
    CARDBOARD_ITEM_DELETE: 'CARDBOARD_ITEM_DELETE',
    CARDBOARD_ITEM_UPDATE: 'CARDBOARD_ITEM_UPDATE',
  },

  CreateItem: (cardboardId: string, newItem: ICardboardItem) => {
    return {
      type: CardboardItemActions.Types.CARDBOARD_ITEM_CREATE,
      payload: {cardboardId, newItem},
    }
  },
  DeleteItem: (cardboardId: string, itemId: string) => {
    return {
      type: CardboardItemActions.Types.CARDBOARD_ITEM_DELETE,
      payload: {cardboardId, itemId},
    }
  },
  UpdateItem: (cardboardId: string, itemId: string, values: {}) => {
    return {
      type: CardboardItemActions.Types.CARDBOARD_ITEM_UPDATE,
      payload: {cardboardId, itemId, values},
    }
  },
}

export const cardboardItemsReducer = (state: IHash<ICardboardItem> = {}, action: IAction) => {
  
  let isChanged = false;
  const values = {}

  switch (action.type) {
    
    case CardboardItemActions.Types.CARDBOARD_ITEM_CREATE: {

      if (action.payload) {
        const newItem = action.payload.newItem as ICardboardItem;

        if (newItem) {
          const itemId = newItem.id;
          isChanged = true;
          values[itemId] = newItem;
        }

      }

    } break;
  
    case CardboardItemActions.Types.CARDBOARD_ITEM_UPDATE: {

      if (action.payload) {
        const itemId = action.payload.itemId as string;
        const newValues = action.payload.values;

        if (itemId && newValues) {
          isChanged = true;
          
          const oldItem = state[itemId];
          
          if (oldItem) {
            const newItem = {
              ...oldItem,
              ...newValues
            }

            values[itemId] = newItem;
          }

        }

      }

    } break;
  
    case CardboardItemActions.Types.CARDBOARD_ITEM_DELETE: {
      
      if (action.payload) {
        const itemId = action.payload.itemId as string;
        
        if (itemId) {
          state = {...state}
          delete state[itemId];
        }
        
      }

    } break;
  
    default: break;
  }

  if (isChanged) {
    state = {
      ...state,
      ...values,
    }
  }

  return state;
}