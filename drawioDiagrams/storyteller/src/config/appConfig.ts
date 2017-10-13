import { initialState } from './initialState';

export const appConfig = {
  InitialState: initialState,
  ActionTypes: {
    NODE_CALC_OUTPUT: 'NODE_CALC_OUTPUT',
    NODE_CALC_VALUE: 'NODE_CALC_VALUE',
  },
  NodeTypes: {
    NODE_TYPE_STRING: 'NODE_TYPE_STRING',
    NODE_TYPE_NUMBER: 'NODE_TYPE_NUMBER',
    NODE_TYPE_IMAGE: 'NODE_TYPE_IMAGE',
    NODE_TYPE_BOOL: 'NODE_TYPE_BOOL',
    NODE_TYPE_ICON: 'NODE_TYPE_ICON',
    NODE_TYPE_OBJECT: 'NODE_TYPE_OBJECT',
  }
}

