import { createInitialState } from '../config/createInitialState';
import { IAction } from '../api/IAction';
import { v4 } from 'node-uuid';
import { appConfig } from '../config/appConfig';
import { IProject } from '../api/project/IProject';

export const projectReducer = (state: IProject = createInitialState(), action: IAction) => {
  
  switch (action.type) {

    default:
    break;
  }
  
  return state;
}