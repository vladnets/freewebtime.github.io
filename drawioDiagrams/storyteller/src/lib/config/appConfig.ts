import { IObject } from '../api/IObject';
import { initialState } from './initialState';

export const appConfig = {
  ObjectTypes: {
    
    DEFAULT: 'Empty',

    APP_API: 'APP_API',
    APP_VIEW_CONTEXT: 'APP_VIEW_CONTEXT',
    APP_EXECUTION_CONTEXT: 'APP_EXECUTION_CONTEXT',
  },
  InitialState: initialState,
  ActionTypes: {
    APP_ACTION_EXECUTE: 'APP_ACTION_EXECUTE',
    PROJECT_ADD_NODE: 'PROJECT_ADD_NODE',
  } 
}

