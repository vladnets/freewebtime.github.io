import { IAppItem } from '../../framework/appData/IAppItem';
import * as ActionTypes from './actionTypes';
import { APP_ITEM_REMOVE } from './actionTypes';

export default {
  addItem: (payload: IAppItem) => {
    return {
      type: ActionTypes.APP_ITEM_ADD,
      payload: payload
    }
  },
  
  removeItem: (payload: IAppItem) => {
    return {
      type: ActionTypes.APP_ITEM_REMOVE,
      payload: payload
    }
  },
  
  replaceItem: (payload: IAppItem) => {
    return {
      type: ActionTypes.APP_ITEM_REPLACE,
      payload: payload
    }
  },
  
  noOperation: () => {
    return {
      type: ActionTypes.NO_OPERATION
    }
  }
}
