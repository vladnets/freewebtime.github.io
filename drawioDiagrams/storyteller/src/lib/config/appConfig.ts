import { IObject } from '../api/IObject';
import { initialState } from './initialState';

export const appConfig = {
  InitialState: initialState,
  ActionTypes: {
    NODE_CALC_OUTPUT: 'NODE_CALC_OUTPUT',
    NODE_CALC_VALUE: 'NODE_CALC_VALUE',
  } 
}

