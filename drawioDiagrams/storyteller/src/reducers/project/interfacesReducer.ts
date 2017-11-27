import { IInterface } from '../../api/project/IInterface';
import { IHash } from '../../api/IHash';
import { IAction } from '../../api/IAction';
import { initialInterfaces } from '../../config/initialInterfaces';

export const interfacesReducer = (state: IHash<IInterface> = initialInterfaces, action: IAction) => {
  return state;
}