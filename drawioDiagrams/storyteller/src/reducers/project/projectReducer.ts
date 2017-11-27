import { IAction } from '../../api/IAction';
import { combineReducers } from 'redux';
import { interfacesReducer } from './interfacesReducer';

export const projectReducer = combineReducers({
  interfaces: interfacesReducer,
});
