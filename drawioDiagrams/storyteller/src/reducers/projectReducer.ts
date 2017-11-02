import { IAction } from '../api/IAction';
import { v4 } from 'node-uuid';
import { appConfig } from '../config/appConfig';
import { IProject } from '../api/project/IProject';

const initialState: IProject = {
  id: v4(),
  name: 'Empty project',
  imports: {},
  modules: {},
}

export const projectReducer = (state: IProject = initialState, action: IAction) => {
  
  switch (action.type) {

    default:
    break;
  }
  
  return state;
}