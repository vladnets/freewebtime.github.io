import { IProject } from '../../api/IProject';
import { IAction } from '../../api/IAction';
import { IAppData } from '../../api/IAppData';
import { graphReducer } from '../graph/graphReducer';
import { projectReducer } from './projectReducer';

export const appDataReducer = function(state: IAppData, action: IAction) {
  if (!state) {
    state = <IAppData>{}
  }

  state.project = projectReducer(state.project, action);

  return state;
}