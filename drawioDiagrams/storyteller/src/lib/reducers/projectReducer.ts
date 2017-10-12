import { nodesReducer } from './nodesReducer';
import { IAction } from '../api/IAction';

export const projectReducer = function(state: any|undefined, action: IAction) {

  state = state || {};

  state = {
    ...state,
    name: state.name || 'default project',
    nodes: nodesReducer(state.nodes, action),
  }

  return state;
}