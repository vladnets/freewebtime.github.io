import { viewContextReducer } from './viewContextReducer';
import { IAction } from '../api/IAction';
import { appReducer } from './appReducer';

export const rootReducer = function(state: any, action: IAction) {
    return {
      viewContext: viewContextReducer(state.viewContext, action),
      app: appReducer(state.app, action)
    }
}
