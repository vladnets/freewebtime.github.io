import { IVector2 } from './IVector2';

export interface IViewItem {
  id: string,
  itemType?: string,
  className?: string,
  position?: IVector2;
  size?: IVector2;
  content?: any;
}