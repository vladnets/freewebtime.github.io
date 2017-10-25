import { typesReducer } from './typesReducer';
import { IAction } from '../api/IAction';
import { IModule } from '../api/INode';
import { IHash } from '../api/IHash';
import { v4 } from 'node-uuid';
import { moduleReducer } from './moduleReducer';
import { appConfig } from '../config/appConfig';
import { functionsReducer } from './functionsReducer';
import { nodesReducer } from './nodesReducer';

const systemModuleId = v4();
const createSystemModuleAction = appConfig.Actions.ModuleCreate({
  id: systemModuleId, 
  name: 'System',
  types: typesReducer(undefined, appConfig.Actions.TypesCreateSystem()),
  functions: functionsReducer(undefined, appConfig.Actions.FunctionsCreateSystem()),
  nodes: {},
});

const systemModule: IHash<IModule> = {
  [systemModuleId]: moduleReducer(undefined, createSystemModuleAction)
}

export const modulesReducer = (state: IHash<IModule> = {}, action: IAction) => {

  switch (action.type) {
    case appConfig.Actions.Types.MODULES_CREATE_SYSTEM: {
      state = {...state, ...systemModule}
    }
    break;

    case appConfig.Actions.Types.MODULE_CREATE:
    {
      const newModule: IModule = moduleReducer(undefined, action);  
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