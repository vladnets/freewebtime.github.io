import { IUniqueObject } from './IUniqueObject';

export interface ICard extends IUniqueObject {
  color: string;
  isSelected?: boolean;  
}