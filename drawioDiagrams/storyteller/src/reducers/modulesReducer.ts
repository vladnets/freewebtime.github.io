import { IAction } from '../api/IAction';
import { IModule } from '../api/INode';
import { IHash } from '../api/IHash';
import { v4 } from 'node-uuid';
import { moduleReducer } from './moduleReducer';

const rootModuleId = v4();
const initialState: IHash<IModule> = {
  [rootModuleId]: {
    id: rootModuleId,
    name: 'Module 1',
    types: {},
    functions: {},
    imports: {},
    exports: {
      types: {}, 
      functions: {}
    },
    nodes: {}
  }
}

export const modulesReducer = (state: IHash<IModule> = initialState, action: IAction) => {
  
  const newState = {...state};

  for (let moduleId in state) {
    if (state.hasOwnProperty(moduleId)) {
      newState[moduleId] = moduleReducer(state[moduleId], action);
    }
  }
  
  return state;
}