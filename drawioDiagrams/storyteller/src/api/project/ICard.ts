import { IProjectItem } from './IProjectItem';
import { IVector2 } from '../IVector2';

export interface ICard extends IProjectItem {
  color?: string;
  isSelected?: boolean;
  position?: IVector2;
  size?: IVector2;
}