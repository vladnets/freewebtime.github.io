import { appResourcesReducer } from './appResources/appResourcesReducer';
import { IApp } from '../api/IApp';
import { IAction } from '../api/IAction';
import { IAppResources } from '../api/IAppResources';
import { appDataReducer } from './appData/appDataReducer';

export const appReducer = function(state: IApp, action: IAction) {
  
  if (!state) {
    state = <IApp> {}
  }

  state.resources = appResourcesReducer(state.resources, action);
  state.data = appDataReducer(state.data, action);

  return state;
}