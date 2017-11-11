import { createInitialState } from '../config/createInitialState';
import { IAction } from '../api/IAction';
import { v4 } from 'node-uuid';
import { appConfig } from '../config/appConfig';
import { IProjectOld, IProject } from '../api/project/IProject';
import { IGraphNode } from '../api/graph/IGraph';
import { IHash } from '../api/IHash';
import { graphNodeReducer } from './graphNodeReducer';
import { graphNodesReducer } from './graphNodesReducer';

export const projectReducer = (state: IProject = <IProject>{}, action: IAction) => {
  return state;
}

export const projectReducerOld = (state: IProjectOld = createInitialState(), action: IAction) => {
  
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
