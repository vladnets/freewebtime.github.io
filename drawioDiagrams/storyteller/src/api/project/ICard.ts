import { IUniqueObject } from '../IUniqueObject';
import { IVector2 } from '../IVector2';

export enum CardType {
  Unknown = 'Unknown',
  Card = 'Card',
  Subcard = 'Subcard',
}

export interface ICard extends IUniqueObject {
  cardType: CardType;
  isSelected?: boolean;
  size: IVector2;
  position: IVector2;
}