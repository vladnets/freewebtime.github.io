import { IAction } from '../api/IAction';
import { IObject } from '../api/IObject';

export const reference = function(state: IObject, action: IAction): IObject|undefined|any {
  console.log('reference', state, 'other', action);

  if (!state || !action || !action.payload) {
    return undefined;
  }

  if (typeof action.payload === 'string') {
    return state[action.payload];    
  }

  if (Array.isArray(action.payload)) {
    return reference(state[action.payload[0]], {...action, payload: action.payload.shift()});
  }

  return undefined;
}

export const ref = function(path: string|string[]) {
  return function(state: IObject, action: IAction) {
    reference(state, {...action, payload: path});
  }
}