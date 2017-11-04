import { createInitialState } from '../config/createInitialState';
import { IAction } from '../api/IAction';
import { v4 } from 'node-uuid';
import { appConfig } from '../config/appConfig';
import { IProject } from '../api/project/IProject';
import { IGraphNode } from '../api/graph/IGraph';
import { IHash } from '../api/IHash';

export const projectReducer = (state: IProject = createInitialState(), action: IAction) => {
  
  switch (action.type) {
    case appConfig.Actions.Types.PROJECT_SELECT_MODULE: {
      state = {...state, selectedModuleId: action.payload};
    }

    default:
    {
      const newModules = graphNodesReducer(state.modules, action);
      if (newModules !== state.modules) {
        state = {...state, modules: newModules}
      }

      const newImports = graphNodesReducer(state.imports, action);
      if (newImports !== state.imports) {
        state = {...state, imports: newImports}
      }
    }
    break;
  }
  
  return state;
}

export const graphNodesReducer = (state: IHash<IGraphNode>, action: IAction) => {
  switch (action.type) {
    case appConfig.Actions.Types.NODE_REMOVE:
    {
      state = {...state}
      delete state[action.payload];
    }
    break;

    case appConfig.Actions.Types.NODE_UPDATE:
    {
      const node = state[action.payload.nodeId];
      if (node) {
        state = {
          ...state, 
          [node.id]: {
            ...node, 
            ...action.payload.newValues
          }
        }
      }

      state = {...state, ...action.payload}
    }
    break;
  
    case appConfig.Actions.Types.NODE_UPDATE_VIEW_DATA:
    {
      const node = state[action.payload.nodeId];
      if (node) {
        const viewData = node.viewData || {};
        state = {
          ...state, 
          [node.id]: {
            ...node, 
            viewData: {
              ...viewData, 
              ...action.payload.newValues
            }
          }
        }
      }

      state = {...state, ...action.payload}
    }
    break;
  
    case appConfig.Actions.Types.NODE_UPDATE:
    {
      state = {...state, ...action.payload}
    }
    break;

    default:
    {
      let isChanged = false;
      const newValues = {}
      Object.keys(state).map((key: string, index: number)=>{
        const oldValue = state[key];
        const newValue = graphNodeReducer(oldValue, action);
        if (oldValue !== newValue) {
          newValues[key] = newValue;
          isChanged = true;
        }
      });

      if (isChanged) {
        state = {...state, ...newValues}
      }
    }
    break;
  }
  
  return state;
}

export const graphNodeReducer = (state: IGraphNode, action: IAction) => {
  return state;
}