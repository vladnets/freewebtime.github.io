import { IAction } from '../api/IAction';
import { IObject } from '../api/IObject';

export const constructor = function(state: IObject, action: IAction): IObject|undefined|any {
  if (!state && (!action || !action.payload)) {
    return undefined;
  }

  let prototype: IObject|undefined = state;
  if (typeof prototype === 'string') {
    return (action.payload as string) || prototype;
  }

  if (Array.isArray(prototype)) {
    const result: any[] = [];
    prototype.map(item => result.push(item));
    return result;
  }

  let args = action.payload || {};
  if (!prototype) {
    prototype = action.payload;
  }
  else {
    prototype = {...prototype, ...action.payload};
  }

  if (prototype) {
    const result: IObject = {};
    for (let fieldName in prototype) {
      if (prototype.hasOwnProperty(fieldName)) {
        let field = prototype[fieldName];
        if (typeof field === 'function') {
          result[fieldName] = field(state, action);
        }
        else {
          result[fieldName] = constructor(field, {...action, payload: args[fieldName]})
        }
      }
    }

    return result;
  }

  return undefined;
}