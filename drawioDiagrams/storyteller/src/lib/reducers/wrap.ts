import { IObject } from '../api/IObject';
import { IAction } from '../api/IAction';
import { reference, ref } from './reference';
import { constructor } from './constructor';

export const wrap = function(prototype: any) {
  return function(state: IObject, action: IAction) {
    
    const result = {};

    return result;
  }
}
