import { IObject } from './IObject';

export interface IViewItem extends IObject {
  ItemType?: string,
  ClassName?: string,
  Content?: any,
}