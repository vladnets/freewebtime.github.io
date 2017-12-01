import { IUniqueObject } from '../IUniqueObject';
import { IVector2 } from '../IVector2';

export interface ICard extends IUniqueObject {
  color?: string;
  isSelected?: boolean;
  size: IVector2;
  position: IVector2;
}