import {
  IConnection,
  IConnectionReference,
  IFunction,
  INode,
  IType,
  ITypeReference,
  NodeType,
  TypeCategory,
} from '../api/INode';
import { IHash } from '../api/IHash';
import { IAction } from '../api/IAction';
import { combineReducers } from 'redux';
import { v4 } from 'node-uuid';
import { appConfig } from '../config/appConfig';

const stringTypeId = appConfig.SystemTypeNames.TYPE_CONSTRUCTOR_STRING;
const numberTypeId = appConfig.SystemTypeNames.TYPE_CONSTRUCTOR_NUMBER;
const booleanTypeId = appConfig.SystemTypeNames.TYPE_CONSTRUCTOR_BOOLEAN;

const createTypeReference = (typeId: string) => {
  return {typeId: typeId}
}

const createFunction = function(
  id: string,
  outputTypeId: string, 
  input: IHash<ITypeReference>, 
  output: IHash<ITypeReference>, 
  locals: IHash<ITypeReference>,
  connections: IHash<IConnection>,
): IFunction {
  const connectionsFrom: IHash<IHash<IConnectionReference>> = {};
  const connectionsTo: IHash<IHash<IConnectionReference>> = {};

  for (let connectionId in connections) {
    if (connections.hasOwnProperty(connectionId)) {
      let connection = connections[connectionId];
      
      const from = connectionsFrom[connection.fromId] || {};
      const to = connectionsTo[connection.toId] || {};
      
      from[connection.toId] = {connectionId: connectionId}
      to[connection.fromId] = {connectionId: connectionId}
      
      connectionsFrom[connection.fromId] = from;
      connectionsTo[connection.toId] = to;
    }
  }

  const result: IFunction = {
    id: id,
    name: id,
    outputTypeId: outputTypeId,
    input: input,
    output: output,
    locals: locals,
    connections: connections,
    connectionsFrom: connectionsFrom,
    connectionsTo: connectionsTo,
  }
  
  return result;
}

const stringFunction = () => {
  const id = appConfig.SystemTypeNames.TYPE_CONSTRUCTOR_STRING;
  const inputId = v4();
  const outputId = v4();
  const connectionId = v4();

  const input: IHash<ITypeReference> = {
    [inputId]: {
      id: inputId,
      name: 'Value',
      typeId: appConfig.SystemTypeNames.TYPE_STRING,
    }
  }
  const output = {
    [outputId]: {
      id: outputId,
      name: 'Result',
      typeId: appConfig.SystemTypeNames.TYPE_STRING
    }
  }
  const locals: IHash<ITypeReference> = {}
  const connections: IHash<IConnection> = {
    [connectionId]: {
      id: connectionId,
      name: connectionId,
      fromId: outputId,
      toId: inputId,
    }
  }

  return createFunction(id, appConfig.SystemTypeNames.TYPE_STRING, input, output, locals, connections);
}

const initialCreators = [
  stringFunction,
]

const initialState: IHash<IFunction> = {};
initialCreators.reduce((result: any, item: any, index: any, array: any) => {
  const func = item();
  initialState[func.id] = func;
}, {});

export const functionsReducer = function(state: IHash<IFunction> = initialState, action: IAction) {
  
  switch (action.type) {
    case appConfig.Actions.Types.FUNCTION_CREATE:
    {
      const id = v4();
      state = {...state, [id]: {...action.payload, id: id}}
    }
    break;

    case appConfig.Actions.Types.FUNCTION_REMOVE:
    {
      state = {...state}
      delete state[action.payload]; 
    }
    break;

    case appConfig.Actions.Types.FUNCTION_UPDATE:
    {
      const id = action.payload.id;
      state = {...state, [id]: action.payload}
    }
    break;

    default: break;
  }
  
  return state;
}
