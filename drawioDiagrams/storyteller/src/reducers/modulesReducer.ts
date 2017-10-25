import { typesReducer } from './typesReducer';
import { IAction } from '../api/IAction';
import { IModule } from '../api/INode';
import { IHash } from '../api/IHash';
import { v4 } from 'node-uuid';
import { moduleReducer } from './moduleReducer';
import { appConfig } from '../config/appConfig';
import { functionsReducer } from './functionsReducer';

const emptyModule: IModule = {
  id: v4(),
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

const systemModuleId = v4();
const initialState: IHash<IModule> = {
  [systemModuleId]: {
    ...emptyModule,
    id: systemModuleId,
    name: 'System',
    types: typesReducer(undefined, {type: ''}),
    functions: functionsReducer(undefined, {type: ''}),
  }
}

export const modulesReducer = (state: IHash<IModule> = initialState, action: IAction) => {

  switch (action.type) {
    case appConfig.Actions.Types.MODULE_CREATE:
    {
      const newModule: IModule = {...emptyModule, ...action.payload}  
      state = {...state, [newModule.id]: newModule};
    }
    break;
  
    default:
    {
      const newState = {...state};
      for (let moduleId in state) {
        if (state.hasOwnProperty(moduleId)) {
          newState[moduleId] = moduleReducer(state[moduleId], action);
        }
      }

      state = newState;
    }
    break;
  }
  
  return state;
}