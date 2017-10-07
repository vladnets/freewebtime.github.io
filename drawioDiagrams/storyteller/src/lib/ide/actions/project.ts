import * as ActionTypes from './actionTypes';
import { IAction } from '../../framework/actions/IAction';

export default {
  projectSelectItem: (itemId: string): IAction => {
    return {
      type: ActionTypes.PROJECT_SELECT_ITEM,
      payload: itemId
    }
  }
}
