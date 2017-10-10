import { IAction } from '../api/IAction';
import { IObject } from '../api/IObject';
import { Utils } from '../utils';
import { appConfig } from '../config/appConfig';

export const objectReducer = function(state: IObject|null, action: IAction): IObject|null|any {
  if (state && action.type === appConfig.ObjectTypes.APP_ACTION_GET_FIELD) {

    let fieldName = action.payload;
    if (Array.isArray(action.payload)) {
      const field = state[action.payload[0]];
      if (!field) {
        return null;
      }

      if (action.payload.length > 1) {
        return objectReducer(field, {...action, payload: action.payload.shift()});
      }

      return field;
    } 
    
    return state[fieldName];
  }

  if (action.type === appConfig.ObjectTypes.APP_ACTION_EXECUTE) {

    if (!state && action.payload) {
      state = action.payload;
    }

    if (state) {
      if (Array.isArray(state)) {
        const result: any[] = [];
        state.map((subitem: any)=>{
          result.push(objectReducer(subitem, action))
        })

        return result;
      } 
      
      else if (typeof state !== 'string') {
        const result = {};

        for (let fieldName in state) {
          if (state.hasOwnProperty(fieldName)) {
            let field: IObject|null = null;
            let argument: IObject|null = null;
            
            if (action.payload) {
              argument = action.payload[fieldName] as IObject;
            }

            field = argument || state[fieldName];

            if (typeof field === 'function') {
              result[fieldName] = field(state, action);
            } else {
              result[fieldName] = objectReducer(field, {...action, payload: argument});
            }
          }
        }

        return result;
      }
    }

    return state;
  }

  return state;
}