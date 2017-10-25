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
import { IFunctionCall, IReference } from '../api/INode';

const stringTypeId = appConfig.SystemTypeNames.TYPE_CONSTRUCTOR_STRING;
const numberTypeId = appConfig.SystemTypeNames.TYPE_CONSTRUCTOR_NUMBER;
const booleanTypeId = appConfig.SystemTypeNames.TYPE_CONSTRUCTOR_BOOLEAN;

const createTypeReference = (typeId: string) => {
  return {typeId: typeId}
}

const createFunction = function(
  id: string,
  outputType: ITypeReference, 
  input: IHash<ITypeReference>, 
  output: IHash<IFunctionCall>, 
  locals: IHash<IFunctionCall>,
  connections: IHash<IConnection>,
): IFunction {

  const result: IFunction = {
    id: id,
    name: id,
    outputType: outputType,
    input: input,
    output: output,
    locals: locals,
  }
  
  return result;
}

const textFunction = () => {
  const id = appConfig.SystemTypeNames.TYPE_CONSTRUCTOR_STRING;
  const inputId = v4();
  const outputId = v4();
  const connectionId = v4();
  const outputArgId = v4();
  const outputReferenceId = v4();
  const outputTypeId = v4();

  const input: IHash<ITypeReference> = {
    [inputId]: {
      id: inputId,
      name: 'Value',
      typeId: appConfig.SystemTypeNames.TYPE_STRING,
      moduleId: 'System',
    }
  }
  
  const output: IHash<IFunctionCall> = {
    [outputId]: {
      
      id: outputId,
      name: 'Result',
      functionId: appConfig.SystemTypeNames.TYPE_STRING,
      
      args: {
        [outputArgId]: {
          reference: {
            id: outputReferenceId,
            name: outputReferenceId,
            referenceId: inputId,
          }
        }
      }

    }
  }

  const locals: IHash<IFunctionCall> = {}
  const connections: IHash<IConnection> = {
    [connectionId]: {
      id: connectionId,
      name: connectionId,
      fromId: outputId,
      toId: inputId,
    }
  }

  const outputType: ITypeReference = {
    id: outputTypeId,
    name: outputTypeId,
    typeId: appConfig.SystemTypeNames.TYPE_STRING,
    moduleId: 'System',
  }

  return createFunction(id, outputType, input, output, locals, connections);
}

const initialCreators = [
  textFunction,
]

const initialState: IHash<IFunction> = {};
initialCreators.reduce((result: any, item: any, index: any, array: any) => {
  const func = item();
  initialState[func.id] = func;
}, {});

export const functionsReducer = function(state: IHash<IFunction> = initialState, action: IAction) {

  console.log(state);

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
