import { typesReducer } from './typesReducer';
import { combineReducers } from 'redux';
import { projectDataReducer } from './projectDataReducer';
import { nodesReducer } from './nodesReducer';
import { projectItemsReducer } from './projectItemsReducer';

export const projectReducer = combineReducers({
  projectData: projectDataReducer,
  nodes: nodesReducer,
  projectItems: projectItemsReducer,
  types: typesReducer, 
});

