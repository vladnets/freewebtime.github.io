import { IProject } from '../api/IProject';
import { IAction } from '../api/IAction';

export const projectReducer = function(state: IProject = initialState, action: IAction) {
  return state;
}

const initialState: IProject  = {
  name: 'Unnamed project',
  nodes: {},
}