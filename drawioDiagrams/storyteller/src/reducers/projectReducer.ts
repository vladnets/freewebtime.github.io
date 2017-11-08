import { createInitialState } from '../config/createInitialState';
import { IAction } from '../api/IAction';
import { v4 } from 'node-uuid';
import { appConfig } from '../config/appConfig';
import { IProject } from '../api/project/IProject';
import { IGraphNode } from '../api/graph/IGraph';
import { IHash } from '../api/IHash';
import { graphNodeReducer } from './graphNodeReducer';

export const projectReducer = (state: IProject = createInitialState(), action: IAction) => {
  
  switch (action.type) {
    case appConfig.Actions.Types.PROJECT_SELECT_MODULE: {
      state = {...state, selectedNode: action.payload};
    }

    default:
    {
      const newSubnodes = graphNodesReducer(state.subnodes, action);
      if (newSubnodes !== state.subnodes) {
        state = {...state, subnodes: newSubnodes}
      }
    }
    break;
  }
  
  return state;
}

export const graphNodesReducer = (state: IHash<IGraphNode> = {}, action: IAction) => {
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
