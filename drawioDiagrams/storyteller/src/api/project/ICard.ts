import { IUniqueObject } from '../IUniqueObject';
import { IVector2 } from '../IVector2';

export enum CardType {
  Unknown = 'Unknown',
  Object = 'Object',
  FunctionCall = 'FunctionCall',
  SourceCode = 'SourceCode',
  Primitive = 'Primitive',
  Structure = 'Structure',
  Function = 'Function',
}

export interface ICard extends IUniqueObject {
  cardType: CardType;
  isSelected?: boolean;
  size: IVector2;
  position: IVector2;
}