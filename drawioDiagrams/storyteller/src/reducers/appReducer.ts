import { combineReducers } from 'redux';
import { appResourcesReducer } from './appResourcesReducer';

export const appReducer = combineReducers({
  resources: appResourcesReducer,
});