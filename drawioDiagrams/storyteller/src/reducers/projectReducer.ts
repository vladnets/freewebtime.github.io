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
    default:
    {
      let isChanged = false;
      const newValues = {}
      Object.keys(state).map((key: string, index: number)=>{
        const oldValue = state[key];
        if (oldValue) {
          const newValue = graphNodeReducer(oldValue, action);
          if (oldValue !== newValue) {
            newValues[key] = newValue;
            isChanged = true;
          }
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
  
  const updateSubnodes = (state: IGraphNode, action: IAction) => {
    let isChanged = false;
    const subnodes = state.subnodes || {};
    const newValues = {}
    Object.keys(subnodes).map((key: string, index: number)=>{
      const oldValue = subnodes[key];
      if (oldValue) {
        const newValue = graphNodeReducer(oldValue, action);
        if (oldValue !== newValue) {
          newValues[key] = newValue;
          isChanged = true;
        }
      }
    });

    if (isChanged) {
      state = {...state, subnodes: {...subnodes, ...newValues}}
    }

    return state;
  }

  switch (action.type) {
    case appConfig.Actions.Types.NODE_UPDATE:
    {
      if (state.id === action.payload.nodeId) {
        state = {...state, ...action.payload.newValues}
      }
      else {
        state = updateSubnodes(state, action);
      }
    }
    break;

    case appConfig.Actions.Types.NODE_UPDATE_VIEW_DATA:
    {
      if (state.id === action.payload.nodeId) {
        state = {
          ...state, 
          viewData: {
            ...state.viewData, 
            ...action.payload.newValues
          }
        }
      }
      else {
        state = updateSubnodes(state, action);
      }
    }
    break;

    default:
    state = updateSubnodes(state, action);
    break;
  }

  return state;
}