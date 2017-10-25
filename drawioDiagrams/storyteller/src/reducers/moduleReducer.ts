import { typesReducer } from './typesReducer';
import { nodesReducer } from './nodesReducer';
import { appConfig } from '../config/appConfig';
import { IAction } from '../api/IAction';
import { IModule } from '../api/INode';
import { v4 } from 'node-uuid';
import { functionsReducer } from './functionsReducer';

const emptyModule: IModule = {
  id: v4(),
  name: 'New Module',
  types: {},
  functions: {},
  imports: {},
  exports: {
    types: {},
    functions: {},
  },
  nodes: {},
}

export const moduleReducer = (state: IModule = emptyModule, action: IAction) => {
  
  switch (action.type) {
    case appConfig.Actions.Types.MODULE_CREATE: {
      state = {...state, id: v4(), ...action.payload}
    }

    case appConfig.Actions.Types.NODE_CREATE_NEW:
    case appConfig.Actions.Types.NODE_REMOVE:
    case appConfig.Actions.Types.NODE_UPDATE:
    {
      if (state.id === action.payload.moduleId) {
        const nodes = nodesReducer(state.nodes, action);
        if (nodes !== state.nodes) {
          state = {...state, nodes: nodes}
        }
      }
    }
    break;

    case appConfig.Actions.Types.FUNCTION_CREATE:
    case appConfig.Actions.Types.FUNCTION_REMOVE:
    case appConfig.Actions.Types.FUNCTION_UPDATE:
    {
      const functions = functionsReducer(state.functions, action);
      if (functions !== state.functions) {
        state = {...state, functions: functions}
      }
    }
    break;
    
    case appConfig.Actions.Types.TYPE_CREATE:
    case appConfig.Actions.Types.TYPE_REMOVE:
    case appConfig.Actions.Types.TYPE_UPDATE:
    {
      const types = typesReducer(state.types, action);
      if (types !== state.types) {
        state = {...state, types: types}
      }
    }
    break;
    
    default:
      break;
  }
  
  return state;
}