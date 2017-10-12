import { IAction } from '../api/IAction';
import { ideReducer } from './ideReducer';

export const appReducer = function(state: any, action: IAction) {

  state = {
    ...state,
    title: 'Storyteller',
    ide: state 
      ? ideReducer(state.ide, action)
      : ideReducer(undefined, action)
    ,
    
  }

  return state;
}