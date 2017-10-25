import { INode, NodeType } from '../api/INode';
import { IHash } from '../api/IHash';
import { IAction } from '../api/IAction';
import { combineReducers } from 'redux';
import { v4 } from 'node-uuid';
import { appConfig } from '../config/appConfig';

const stringTypeId = appConfig.SystemTypeNames.TYPE_STRING;
const numberTypeId = appConfig.SystemTypeNames.TYPE_NUMBER;
const booleanTypeId = appConfig.SystemTypeNames.TYPE_BOOLEAN;
const stringConstructorId = appConfig.SystemTypeNames.TYPE_CONSTRUCTOR_STRING;

const systemNodes: IHash<INode> = {
  [stringTypeId]: {
    id: stringTypeId,
    name: stringTypeId,
    nodeType: NodeType.Value,
    position: {x: 20, y: 10},
    size: {x: 250, y: 180},
    reference: stringTypeId,
  },
  [numberTypeId]: {
    id: numberTypeId,
    name: numberTypeId,
    nodeType: NodeType.Value,
    position: {x: 150, y: 230},
    size: {x: 250, y: 180},
    reference: numberTypeId,
  },
  [booleanTypeId]: {
    id: booleanTypeId,
    name: booleanTypeId,
    nodeType: NodeType.Value,
    position: {x: 350, y: 250},
    size: {x: 250, y: 180},
    reference: booleanTypeId,
  },

  [stringConstructorId]: {
    id: stringConstructorId,
    name: stringConstructorId,
    nodeType: NodeType.Function,
    position: {x: 30, y: 400},
    size: {x: 130, y: 70},
    reference: stringConstructorId,
  }
}

const emptyNode: INode = {
  id: v4(),
  name: 'new node',
  nodeType: NodeType.Function,
  position: {x: 30, y: 400},
  size: {x: 130, y: 70},
}

export const nodesReducer = function(state: IHash<INode> = {}, action: IAction) {
  
  switch (action.type) {
    case appConfig.Actions.Types.NODES_CREATE_SYSTEM:
    {
      state = {...systemNodes};
    }
    break;

    case appConfig.Actions.Types.NODE_CREATE_NEW:
    {
      const nodeId = v4();
      state = {...state, [nodeId]: {...emptyNode, ...action.payload.data, id: nodeId}}
    }
    break;

    case appConfig.Actions.Types.NODE_REMOVE:
    {
      state = {...state}
      delete state[action.payload.nodeId]; 
    }
    break;

    case appConfig.Actions.Types.NODE_UPDATE:
    {
      const nodeId = action.payload.node.id;
      state = {...state, [nodeId]: action.payload.node}
    }
    break;

    default: break;
  }
  
  return state;
}
