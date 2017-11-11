import { IAction } from '../api/IAction';
import { IHash } from '../api/IHash';

declare type subitemReducer<TSubitem> = (state: TSubitem, action: IAction)=>TSubitem
export const hashsetReducer = <TSubitem>(
  state: IHash<TSubitem> = {}, 
  action: IAction, 
  subitemReducer: subitemReducer<TSubitem>,
  addSubitemActionType?: string,
  subitemIdKey: string = 'id'
): IHash<TSubitem> => {

  let isChanged = false;
  const newState = {};

  if (addSubitemActionType && action.type === addSubitemActionType) {
    const newSubitem = subitemReducer(<TSubitem>{}, action);
    const newSubitemId = newSubitem[subitemIdKey] as string;
    if (newSubitemId) {
      isChanged = true;
      newState[newSubitemId] = newSubitem;
    }
  }

  Object.keys(state).map((key: string, index: number) => {
    const oldValue = state[key];
    const newValue = subitemReducer(oldValue, action);

    if (newState !== undefined) {
      newState[key] = newValue;
    }
    
    if (oldValue !== newValue) {
      isChanged = true;
    }
  })

  return isChanged 
    ? newState 
    : state
  ;
}