import { INode, NodeType, IType, TypeCategory } from '../api/INode';
import { IHash } from '../api/IHash';
import { IAction } from '../api/IAction';
import { combineReducers } from 'redux';
import { v4 } from 'node-uuid';
import { appConfig } from '../config/appConfig';

const stringTypeId = appConfig.SystemTypeNames.TYPE_STRING;
const numberTypeId = appConfig.SystemTypeNames.TYPE_NUMBER;
const booleanTypeId = appConfig.SystemTypeNames.TYPE_BOOLEAN;

const initialState: IHash<IType> = {
  [stringTypeId]: {
    id: stringTypeId,
    name: stringTypeId,
    category: TypeCategory.Value,
  },
  [numberTypeId]: {
    id: numberTypeId,
    name: numberTypeId,
    category: TypeCategory.Value,
  },
  [booleanTypeId]: {
    id: numberTypeId,
    name: booleanTypeId,
    category: TypeCategory.Value,
  },
}

export const typesReducer = function(state: IHash<IType> = initialState, action: IAction) {
  
  switch (action.type) {
    case appConfig.Actions.Types.TYPE_CREATE:
    {
      const typeId = v4();
      state = {...state, [typeId]: {...action.payload, id: typeId}}
    }
    break;

    case appConfig.Actions.Types.TYPE_REMOVE:
    {
      state = {...state}
      delete state[action.payload]; 
    }
    break;

    case appConfig.Actions.Types.TYPE_UPDATE:
    {
      const typeId = action.payload.id;
      state = {...state, [typeId]: action.payload}
    }
    break;

    default: break;
  }
  
  return state;
}