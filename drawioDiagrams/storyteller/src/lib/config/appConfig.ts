import { IObject } from '../api/IObject';
import { initialState } from './initialState';

export const appConfig = {
  ObjectTypes: {
    
    DEFAULT: 'Empty',

    APP_API: 'APP_API',
    APP_VIEW_CONTEXT: 'APP_VIEW_CONTEXT',
    APP_EXECUTION_CONTEXT: 'APP_EXECUTION_CONTEXT',

    APP_ACTION_EXECUTE: 'APP_ACTION_EXECUTE',
    APP_ACTION_GET_FIELD: 'APP_ACTION_GET_FIELD',
  },
  InitialState: initialState, 
}

