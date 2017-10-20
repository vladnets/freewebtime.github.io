import { combineReducers } from 'redux';
import { projectReducer } from './projectReducer';
import { appResourcesReducer } from './appResourcesReducer';

export const rootReducer = combineReducers({
  project: projectReducer,
  resources: appResourcesReducer,
});