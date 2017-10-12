import { IAction } from '../api/IAction';
import { appConfig } from '../config/appConfig';
import { Utils } from '../utils';
import { nodeReducer } from './nodeReducer';

export const nodesReducer = function(state: any, action: IAction) {

  state = state || {};

  const result = {};
  for (let key in state) {
    if (state.hasOwnProperty(key)) {

      const node = nodeReducer(state[key], action);
      if (node) {
        result[key] = node;
      }
    }
  }

  if (action.type === appConfig.ActionTypes.PROJECT_ADD_NODE) {
    let node = nodeReducer(undefined, action);
    if (node) {
      result[node.id] = node;
    } 
  }

  return result;
}