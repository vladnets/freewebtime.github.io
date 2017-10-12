import { IAction } from '../api/IAction';
import { projectReducer } from './projectReducer';

export const ideReducer = function(state: any|undefined, action: IAction) {

  state = {
    ...state,
    project: state 
      ? projectReducer(state.project, action) 
      : projectReducer(undefined, action)
    ,
  };

  return state;
}