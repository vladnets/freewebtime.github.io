import { IGraphNode } from '../../api/IGraphNode';
import { IGraph } from '../../api/IGraph';
import { IAction } from '../../api/IAction';
import { graphNodeReducer } from './graphNodeReducer';

export const graphReducer = function(state: IGraph, action: IAction) {
  if (!state) {
    return state;
  }

  Object.keys(state.nodes).map((nodeId: string) => {
    console.log('nodeId, nodes: ', nodeId, state.nodes);

    let node: IGraphNode = graphNodeReducer(state.nodes[nodeId], action);
    if (!node) {
      delete state.nodes[nodeId];
    }
    else {
      state.nodes[nodeId] = node;
    }
  });

  return state;
}