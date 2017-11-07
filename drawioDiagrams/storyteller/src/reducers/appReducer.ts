import { combineReducers } from 'redux';
import { appResourcesReducer } from './appResourcesReducer';
import { projectReducer } from './projectReducer';
import { socketsDataReducer } from './socketsDataReducer';

export const appReducer = combineReducers({
  project: projectReducer,
  resources: appResourcesReducer,
  socketsData: socketsDataReducer,
});