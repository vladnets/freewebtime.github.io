import { IViewContext } from '../api/IVIewContext';
import { themeReducer } from './themeReducer';
import { IObject } from '../api/IObject';
import { IAction } from '../api/IAction';

export const viewContextReducer = function(state: IViewContext|undefined, action: IAction){
  return state || {
    Theme: themeReducer(state, action),
  }
}