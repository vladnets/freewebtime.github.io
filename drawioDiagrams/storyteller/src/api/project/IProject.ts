import { ISymbol } from './ISymbol';
import { IUniqueObject } from '../IUniqueObject';
import { IInterface } from './IInterface';
import { IHash } from '../IHash';
import { IItem } from './IItem';

export interface IProject extends IUniqueObject {
  interfaces: IHash<string>;
  objects: IHash<string>;
  
  symbols: IHash<ISymbol>;
}