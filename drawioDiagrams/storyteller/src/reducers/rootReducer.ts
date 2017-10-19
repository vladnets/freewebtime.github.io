import { projectReducer } from './projectReducer';
import { appConfig } from '../config/appConfig';
import { IAction } from '../api/IAction';
import { IAppState } from '../api/IAppState';

export const rootReducer = function(state: IAppState = defaultState, action: IAction) {
  return state;
}

const defaultState: IAppState = {
  project: projectReducer(undefined, appConfig.Actions.NoOperation()),
}
