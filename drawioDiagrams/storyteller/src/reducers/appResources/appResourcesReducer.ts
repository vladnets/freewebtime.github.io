import { themeReducer } from './themeReducer';
import { IAppResources } from '../../api/IAppResources';
import { IAction } from '../../api/actions/IAction';

export const appResourcesReducer = function(state: IAppResources|undefined, action: IAction) {
  if (!state) {
    state = <IAppResources> {
      theme: themeReducer({}, action),
    }
  }

  return state;
}