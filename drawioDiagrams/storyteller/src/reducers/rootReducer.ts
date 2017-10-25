import { combineReducers } from 'redux';
import { appResourcesReducer } from './appResourcesReducer';
import { projectReducer } from './projectReducer';

export const rootReducer = combineReducers({
  project: projectReducer,
  resources: appResourcesReducer,
});