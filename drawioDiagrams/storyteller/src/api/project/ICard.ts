import { IUniqueObject } from '../IUniqueObject';
import { IReference } from './IReference';
import { IVector2 } from '../IVector2';

export interface ICard extends IUniqueObject {
  color?: string;
  isSelected?: boolean;
  symbol: IReference;
  size: IVector2;
  position: IVector2;
}