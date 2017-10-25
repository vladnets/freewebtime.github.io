import { modulesReducer } from './modulesReducer';
import { typesReducer } from './typesReducer';
import { IProject } from '../api/IAppState';
import { IAction } from '../api/IAction';
import { v4 } from 'node-uuid';
import { nodesReducer } from './nodesReducer';
import { functionsReducer } from './functionsReducer';
import { appConfig } from '../config/appConfig';

const rootModuleId = v4();
const initialState: IProject = {
  id: v4(),
  name: 'New Project',
  imports: {},
  exports: {},

  modules: {
    [rootModuleId]: {
      id: rootModuleId,
      name: 'New Module',
      types: {},
      functions: {},
      imports: {},
      exports: {
        types: {}, 
        functions: {}
      },
      nodes: {}
    }
  },
  rootModuleId: rootModuleId,
}

export const projectReducer = (state: IProject = initialState, action: IAction) => {
  
  switch (action.type) {
    case appConfig.Actions.Types.NODE_CREATE_NEW:
    case appConfig.Actions.Types.NODE_REMOVE:
    case appConfig.Actions.Types.NODE_UPDATE:
    case appConfig.Actions.Types.FUNCTION_CREATE:
    case appConfig.Actions.Types.FUNCTION_REMOVE:
    case appConfig.Actions.Types.FUNCTION_UPDATE:
    case appConfig.Actions.Types.TYPE_CREATE:
    case appConfig.Actions.Types.TYPE_REMOVE:
    case appConfig.Actions.Types.TYPE_UPDATE:
    {
      const modules = modulesReducer(state.modules, action);
      if (modules !== state.modules) {
        state = {...state, modules: modules}
      }
    }
    break;
    
    case appConfig.Actions.Types.PROJECT_SELECT_MODULE:
    {
      state = {...state, selectedModuleId: action.payload}
    }
    break;

    case appConfig.Actions.Types.MODULE_CREATE:
    {
      const id = v4();
      state = {...state, [id]: {...action.payload, id: id}}
    }
    break;

    case appConfig.Actions.Types.MODULE_REMOVE:
    {
      state = {...state}
      delete state[action.payload]; 
    }
    break;

    case appConfig.Actions.Types.MODULE_UPDATE:
    {
      const id = action.payload.id;
      state = {...state, [id]: action.payload}
    }
    break;

    default:
      break;
  }
  
  return state;
}