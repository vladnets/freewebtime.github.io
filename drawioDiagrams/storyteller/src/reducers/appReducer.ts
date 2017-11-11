import { combineReducers } from 'redux';
import { appResourcesReducer } from './appResourcesReducer';
import { projectReducerOld } from './projectReducer';
import { socketsDataReducer } from './socketsDataReducer';

export const appReducer = combineReducers({
  project: projectReducerOld,
  resources: appResourcesReducer,
  socketsData: socketsDataReducer,
});