import { IAction } from '../api/IAction';
import { IObject } from '../api/IObject';

export const reference = function(state: any, path: string): IObject|undefined|any {
  if (!state || !path) {
    return undefined;
  }

  return state[path];    
}

export const ref = function(path: string) {
  return function(state: any, action: IAction, context: any) {
    let result = reference(context, path);
    return result; 
  }
}