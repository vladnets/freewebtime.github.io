import { IAction } from '../../api/IAction';
import { IHash } from '../../api/IHash';
import { IItem } from '../../api/project/IItem';
import { initialItems } from '../../config/initialState';

export const itemsReducer = (state: IHash<string> = initialItems, action: IAction) => {
  return state;
}