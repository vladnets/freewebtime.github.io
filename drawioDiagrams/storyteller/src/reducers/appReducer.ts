import { combineReducers } from 'redux';
import { appResourcesReducer } from './appResourcesReducer';
import { projectReducer } from './project/projectReducer';

export const appReducer = combineReducers({
  resources: appResourcesReducer,
  project: projectReducer,
});