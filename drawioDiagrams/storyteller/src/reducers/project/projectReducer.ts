import { IAction } from '../../api/IAction';
import { combineReducers } from 'redux';
import { interfacesReducer } from './interfacesReducer';
import { itemsReducer } from './itemsReducer';
import { symbolsReducer } from './symbolsReducer';

export const projectReducer = combineReducers({
  interfaces: interfacesReducer,
  items: itemsReducer,
  symbols: symbolsReducer,
});
