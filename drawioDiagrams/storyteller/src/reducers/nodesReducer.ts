import { INode, NodeType } from '../api/INode';
import { IHash } from '../api/IHash';
import { IAction } from '../api/IAction';
import { combineReducers } from 'redux';
import { v4 } from 'node-uuid';
import { appConfig } from '../config/appConfig';

const emptyNodeId = v4();
const emptyNodeId2 = v4();

const initialState: IHash<INode> = {
  [emptyNodeId]: {
    id: emptyNodeId,
    name: 'Empty',
    nodeType: NodeType.Unknown,
    position: {x: 0, y: 0},
    size: {x: 250, y: 180},
  },
  [emptyNodeId2]: {
    id: emptyNodeId2,
    name: 'Empty 2',
    nodeType: NodeType.Unknown,
    position: {x: 150, y: 250},
    size: {x: 250, y: 180},
  }
}

export const nodesReducer = function(state: IHash<INode> = initialState, action: IAction) {
  
  switch (action.type) {
    case appConfig.Actions.Types.NODE_CREATE_NEW:
    {
      const nodeId = v4();
      state = {...state, [nodeId]: {...action.payload, id: nodeId}}
    }
    break;

    case appConfig.Actions.Types.NODE_REMOVE:
    {
      state = {...state}
      delete state[action.payload]; 
    }
    break;

    case appConfig.Actions.Types.NODE_UPDATE:
    {
      const nodeId = action.payload.id;
      state = {...state, [nodeId]: action.payload}
    }
    break;

    case appConfig.Actions.Types.NODE_MOVE:
    {
      const nodeId = action.payload.nodeId;
      const node = state[nodeId];
      if (node) {
        const currentPos = node.position || {x: 0, y: 0};
        const offset = action.payload.offset;
        const newPosition = {x: currentPos.x + offset.x, y: currentPos.y + offset.y};
        state = {...state, [nodeId]: {...node, position: newPosition}}
      }
    }
    break;

    case appConfig.Actions.Types.NODE_RESIZE:
    {
      const nodeId = action.payload.nodeId;
      const node = state[nodeId];
      if (node) {
        const currentSize = node.size || {x: 0, y: 0};
        const deltaSize = action.payload.deltaSize;
        const newSize = {x: currentSize.x + deltaSize.x, y: currentSize.y + deltaSize.y};
        state = {...state, [nodeId]: {...node, size: newSize}}
      }
    }
    break;

    default: break;
  }
  
  return state;
}
