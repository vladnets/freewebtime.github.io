import { INode, NodeType } from '../api/INode';
import { IHash } from '../api/IHash';
import { IAction } from '../api/IAction';
import { combineReducers } from 'redux';
import { v4 } from 'node-uuid';
import { appConfig } from '../config/appConfig';

const emptyNodeId = v4();
const emptyNodeId2 = v4();
const emptyNodeId3 = v4();

const initialState: IHash<INode> = {
  [emptyNodeId]: {
    id: emptyNodeId,
    name: 'Empty node 1',
    nodeType: NodeType.Unknown,
    position: {x: 20, y: 10},
    size: {x: 250, y: 180},
  },
  [emptyNodeId2]: {
    id: emptyNodeId2,
    name: 'Empty node 2',
    nodeType: NodeType.Unknown,
    position: {x: 150, y: 230},
    size: {x: 250, y: 180},
  },
  [emptyNodeId3]: {
    id: emptyNodeId3,
    name: 'Empty node 3',
    nodeType: NodeType.Unknown,
    position: {x: 350, y: 250},
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

    default: break;
  }
  
  return state;
}
