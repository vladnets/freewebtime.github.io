import { IGraph } from '../../api/IGraph';
import { IAction } from '../../api/IAction';
import { INode } from '../../api/INode';
import { nodeReducer } from './nodeReducer';

export const graphReducer = function(state: IGraph, action: IAction) {
  if (!state) {
    return state;
  }

  state.root = nodeReducer(state.root, action);

  return state;
}