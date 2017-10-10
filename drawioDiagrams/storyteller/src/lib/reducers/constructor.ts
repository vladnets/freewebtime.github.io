import { appConfig } from '../config/appConfig';
import { IAction } from '../api/IAction';
import { IObject } from '../api/IObject';

export const constructor = function(state: any, action: IAction, context: any) {

  const createItem = function(prototype: any, state: any, action: IAction, context: any) {
    let typeofProto = typeof prototype;
    if (typeof prototype === 'function') {
      let result = prototype(state, action, context);
      result.Prototype = prototype;
      return result;
    }
    
    else if (typeof prototype === 'string') {
      return prototype;
    }

    else if (Array.isArray(prototype)) {
      let result: any = [];
      prototype.map(subitem=>result.push(createItem(subitem, state, action, context)));
      return result;
    }

    else if (prototype) {
      //if object
      return constructor(prototype, action, context);
    }

    return undefined;
  }

  if (state) {
    if (action.type === appConfig.ActionTypes.APP_ACTION_EXECUTE) {
      
      if (typeof state === 'function') {
        let result = state(state, action, context);
        return result;
      }

      else if (Array.isArray(state)) {
        let result: any[] = [];
        state.map(item=>result.push(constructor(item, action, context)));
        return result;
      }

      else if (typeof state === 'object') {
        let result = {...state};

        for (let fieldName in state) {
          if (state.hasOwnProperty(fieldName)) {
            let fieldValue = state[fieldName];
            
            if (fieldValue) {
              let prototype = fieldValue[('Prototype')];
              
              if (prototype) {
                result[fieldName] = createItem(prototype, fieldValue, action, state);
              }
  
              else {
                result[fieldName] = constructor(fieldValue, action, state);
              }
            }
          }
        }

        return result;
      }

      else {
        return state;
      }
    }
  }
  return state;
}