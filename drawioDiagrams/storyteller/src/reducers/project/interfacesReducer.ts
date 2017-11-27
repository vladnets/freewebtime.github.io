import { IInterface } from '../../api/project/IInterface';
import { IHash } from '../../api/IHash';
import { IAction } from '../../api/IAction';
import { initialInterfaces } from '../../config/initialState';

export const interfacesReducer = (state: IHash<string> = initialInterfaces, action: IAction) => {
  return state;
}