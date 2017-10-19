import { combineReducers } from 'redux';
import { projectDataReducer } from './projectDataReducer';
import { nodesReducer } from './nodesReducer';

export const projectReducer = combineReducers({
  projectData: projectDataReducer,
  nodes: nodesReducer,
});

