import { appConfig } from '../config/appConfig';
import { ITheme } from '../api/index';
import { IAction } from '../api/IAction';
import { IAppResources } from '../api/IAppResources';

const theme: ITheme = {
  
}
  
const initialState: IAppResources = {
  theme: theme,
  callback: ()=>{}
}

export const appResourcesReducer = (state: IAppResources = initialState, action: IAction) => {
  if (action.type === appConfig.Actions.Types.APP_SET_CALLBACK) {
    return {...state, callback: action.payload}  
  }
  
  return state;
}
